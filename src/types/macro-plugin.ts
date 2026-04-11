import type { PluginManifest } from "./manifest"
import type { PluginParam, RangeParam } from "./parameters"
import type { AudioEffectIO, AudioEffectFactory } from "./audio-effect"
import type { PluginContext } from "./context"
import type { ShareablePreset } from "./preset"

/**
 * A single DSP stage within a macro plugin chain.
 *
 * Each stage represents one processing step (e.g. EQ, compressor, saturator).
 * Stages are connected in series: input → stage0 → stage1 → ... → output.
 */
export interface MacroStage {
    /** Unique identifier for this stage within the chain */
    readonly id: string
    /** Human-readable label for the stage (e.g. "Compressor", "EQ") */
    readonly label: string
    /**
     * DSP category hint — helps the DAW render appropriate visualisation.
     * Not exhaustive; use `"other"` for custom processing.
     */
    readonly category:
        | "eq"
        | "compressor"
        | "limiter"
        | "gate"
        | "saturator"
        | "reverb"
        | "delay"
        | "chorus"
        | "filter"
        | "stereo"
        | "exciter"
        | "deesser"
        | "other"
    /** Whether this stage can be bypassed independently */
    readonly bypassable?: boolean
}

/**
 * Macro control — a simplified knob that drives multiple internal parameters.
 *
 * A macro control maps a single 0–1 value to one or more internal parameter
 * ranges.  For example, a "Warmth" knob at 0.7 might set saturation drive
 * to 0.35, EQ low-shelf gain to +2 dB, and high-shelf gain to -1 dB.
 */
export interface MacroControlMapping {
    /** Target parameter ID within the plugin */
    readonly targetParamId: string
    /** Value when macro is at 0 */
    readonly minValue: number
    /** Value when macro is at 1 */
    readonly maxValue: number
}

/**
 * A high-level macro control exposed to the user.
 * Extends RangeParam with mapping information.
 */
export interface MacroControl extends RangeParam {
    /** Internal parameter mappings driven by this macro knob */
    readonly mappings: readonly MacroControlMapping[]
}

/**
 * Macro plugin descriptor — metadata for a plugin that composes multiple
 * DSP stages into a single musical tool with simplified macro controls.
 */
export interface MacroPluginDescriptor {
    /** Ordered DSP stages in the processing chain */
    readonly stages: readonly MacroStage[]
    /** High-level macro controls exposed to the user */
    readonly macroControls?: readonly MacroControl[]
    /** Default presets bundled with the plugin */
    readonly factoryPresets: readonly ShareablePreset[]
}

/**
 * Full macro plugin manifest — extends the standard manifest with
 * macro-specific metadata.
 */
export interface MacroPluginManifest extends PluginManifest {
    readonly type: "audio-effect"
    /** Macro plugin descriptor with stage and control information */
    readonly macro: MacroPluginDescriptor
}

/**
 * Macro plugin module shape — the full export of a macro plugin file.
 */
export interface MacroPluginModule {
    readonly manifest: MacroPluginManifest
    readonly factory: AudioEffectFactory
    readonly presets: readonly ShareablePreset[]
}

/**
 * Apply a macro control value to a set of parameter values.
 *
 * Pure function — returns a new params record with mapped values applied.
 */
export function applyMacroControl(
    params: Readonly<Record<string, number | boolean | string>>,
    macro: MacroControl,
    normalizedValue: number
): Readonly<Record<string, number | boolean | string>> {
    const clamped = Math.max(0, Math.min(1, normalizedValue))
    const result = { ...params }
    for (const mapping of macro.mappings) {
        const mapped = mapping.minValue + (mapping.maxValue - mapping.minValue) * clamped
        ;(result as Record<string, number | boolean | string>)[mapping.targetParamId] = mapped
    }
    return result
}

/**
 * Interpolate between two preset value snapshots.
 *
 * Used for preset morphing — blends numeric parameters linearly,
 * keeps boolean/string values from whichever preset is closer to `t`.
 *
 * @param a  First preset values
 * @param b  Second preset values
 * @param t  Blend factor, 0 = fully `a`, 1 = fully `b`
 */
export function interpolatePresets(
    a: Readonly<Record<string, number | boolean | string>>,
    b: Readonly<Record<string, number | boolean | string>>,
    t: number
): Readonly<Record<string, number | boolean | string>> {
    const clamped = Math.max(0, Math.min(1, t))
    const result: Record<string, number | boolean | string> = {}
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)])
    for (const key of allKeys) {
        const valA = a[key]
        const valB = b[key]
        if (typeof valA === "number" && typeof valB === "number") {
            result[key] = valA + (valB - valA) * clamped
        } else if (clamped < 0.5) {
            if (valA !== undefined) { result[key] = valA }
            else if (valB !== undefined) { result[key] = valB }
        } else {
            if (valB !== undefined) { result[key] = valB }
            else if (valA !== undefined) { result[key] = valA }
        }
    }
    return result
}

/**
 * Generate randomized parameter values within safe ranges.
 *
 * Uses the param definitions to stay within [min, max] for range params,
 * randomly toggles booleans, and picks random choices.
 */
export function randomizeParams(
    params: readonly PluginParam[],
    randomFn: () => number = Math.random
): Readonly<Record<string, number | boolean | string>> {
    const result: Record<string, number | boolean | string> = {}
    for (const param of params) {
        switch (param.type) {
            case "range":
                result[param.id] = param.min + (param.max - param.min) * randomFn()
                break
            case "bool":
                result[param.id] = randomFn() > 0.5
                break
            case "choice":
                result[param.id] = param.choices[Math.floor(randomFn() * param.choices.length)].value
                break
        }
    }
    return result
}

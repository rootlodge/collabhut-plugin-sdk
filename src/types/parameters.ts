/**
 * Parameter curve controls how raw 0–1 knob values map to parameter values.
 * - `"linear"` — equal steps
 * - `"log"` — logarithmic, good for frequency and time
 * - `"exp"` — exponential, good for gain/amplitude  
 */
export type ParamCurve = "linear" | "log" | "exp"

/** Data type for a discrete-choice parameter */
export interface ChoiceOption {
    readonly value: string
    readonly label: string
}

/**
 * Continuous (knob/slider) parameter definition.
 *
 * @example
 * ```ts
 * {
 *     id: "cutoff",
 *     label: "Cutoff",
 *     type: "range",
 *     min: 20,
 *     max: 20000,
 *     default: 1000,
 *     unit: "Hz",
 *     curve: "log",
 * }
 * ```
 */
export interface RangeParam {
    readonly type: "range"
    /** Unique identifier within this plugin's parameter set */
    readonly id: string
    /** Display label shown in the device editor */
    readonly label: string
    readonly min: number
    readonly max: number
    readonly default: number
    /** Optional unit shown next to the value, e.g. "Hz", "dB", "ms" */
    readonly unit?: string
    readonly curve?: ParamCurve
    /** Number of decimal places shown in the UI */
    readonly decimals?: number
    /** Optional automation grouping label */
    readonly group?: string
}

/**
 * Boolean (on/off) parameter — rendered as a toggle button.
 */
export interface BoolParam {
    readonly type: "bool"
    readonly id: string
    readonly label: string
    readonly default: boolean
    readonly group?: string
}

/**
 * Discrete-choice parameter — rendered as a dropdown.
 */
export interface ChoiceParam {
    readonly type: "choice"
    readonly id: string
    readonly label: string
    readonly choices: readonly ChoiceOption[]
    readonly default: string
    readonly group?: string
}

export type PluginParam = RangeParam | BoolParam | ChoiceParam

/**
 * Type-safe map from param IDs to values.
 * Produced by the runtime from the current automation state.
 */
export type ParamValues<T extends ReadonlyArray<PluginParam>> = {
    readonly [P in T[number] as P["id"]]: P extends RangeParam
        ? number
        : P extends BoolParam
        ? boolean
        : string
}

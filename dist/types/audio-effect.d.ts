import type { PluginContext } from "./context";
import type { PluginParam } from "./parameters";
import type { PluginManifest } from "./manifest";
/** The stereo or mono AudioNode pair exposed by an audio-effect plugin */
export interface AudioEffectIO {
    /** Plugin receives audio here — connect the host's source to this node */
    readonly input: AudioNode;
    /** Plugin outputs processed audio from here — host connects this to the chain */
    readonly output: AudioNode;
    /**
     * Optional side-chain input for compressors, gates, etc.
     * Declare `sidechain: true` in the manifest to activate this input.
     */
    readonly sidechain?: AudioNode;
    /**
     * Named AudioParams made available for automation.
     * Keys must match the `id` fields of `manifest.params` entries.
     * If omitted, the DAW uses param-polling via `getParamValue()` instead.
     */
    readonly automationTargets?: Readonly<Record<string, AudioParam>>;
}
/**
 * Audio effect plugin interface.
 *
 * Return an `AudioEffectIO` from your factory function.  The host wires
 * `input` and `output` into the track processing chain automatically.
 *
 * @example
 * ```ts
 * import type { AudioEffectFactory, PluginContext } from "@collabhut/plugin-sdk"
 *
 * export const manifest = {
 *     id: "com.myorg.warm-compressor",
 *     // ...
 *     params: [
 *         { type: "range", id: "threshold", label: "Threshold",
 *           min: -60, max: 0, default: -18, unit: "dB" },
 *         { type: "range", id: "ratio", label: "Ratio",
 *           min: 1, max: 20, default: 4, decimals: 1 },
 *     ],
 * } satisfies PluginManifest
 *
 * export const factory: AudioEffectFactory<typeof manifest.params> =
 *     (context, params) => {
 *         const compressor = context.audioContext.createDynamicsCompressor()
 *         compressor.threshold.value = params.threshold
 *         compressor.ratio.value     = params.ratio
 *         return {
 *             input:  compressor,
 *             output: compressor,
 *             automationTargets: {
 *                 threshold: compressor.threshold,
 *                 ratio:     compressor.ratio,
 *             },
 *         }
 *     }
 * ```
 */
export type AudioEffectFactory<TParams extends ReadonlyArray<PluginParam> = ReadonlyArray<PluginParam>> = (context: PluginContext, params: Readonly<Record<string, number | boolean | string>>, manifest: PluginManifest) => AudioEffectIO;
/**
 * Full audio-effect module shape.
 * Your plugin file must export both `manifest` and `factory`.
 */
export interface AudioEffectModule {
    readonly manifest: PluginManifest & {
        readonly type: "audio-effect";
    };
    readonly factory: AudioEffectFactory;
}
//# sourceMappingURL=audio-effect.d.ts.map
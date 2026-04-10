/**
 * Shareable preset — a snapshot of parameter values for a specific plugin.
 *
 * Presets can be stored locally, synced to CollabHut, and shared with other
 * users via the marketplace.
 *
 * @example
 * ```ts
 * import type { ShareablePreset } from "@collabhut/plugin-sdk"
 *
 * const preset: ShareablePreset = {
 *     pluginId: "com.collabhut.harmonic-exciter",
 *     name: "Warm Presence",
 *     author: "CollabHut",
 *     description: "Gentle harmonic enhancement for acoustic instruments",
 *     tags: ["warm", "acoustic", "gentle"],
 *     values: { drive: 0.3, presenceFreq: 2500, presenceGain: 3, airGain: 2, mix: 0.6 },
 *     version: "1.0.0",
 * }
 * ```
 */
export interface ShareablePreset {
    /** manifestId of the target plugin */
    readonly pluginId: string;
    /** Human-readable preset name */
    readonly name: string;
    /** Author display name */
    readonly author: string;
    /** Optional description of the preset's character */
    readonly description?: string;
    /** Tags for search and filtering */
    readonly tags?: readonly string[];
    /** Parameter values keyed by param ID */
    readonly values: Readonly<Record<string, number | boolean | string>>;
    /** Plugin version this preset was created with */
    readonly version: string;
}
/**
 * A vocal preset bundled with metadata for sharing.
 * Contains the full VocalPreset data plus display information.
 */
export interface ShareableVocalPreset {
    /** Unique identifier */
    readonly id?: string;
    /** Human-readable name */
    readonly name: string;
    /** Author display name */
    readonly author: string;
    /** Optional description */
    readonly description?: string;
    /** Genre classification */
    readonly genre?: string;
    /** Tags for search */
    readonly tags?: readonly string[];
    /** Whether this is an official CollabHut preset */
    readonly isOfficial?: boolean;
    /** The actual vocal chain configuration */
    readonly preset: import("./vocal-preset").VocalPreset;
}
//# sourceMappingURL=preset.d.ts.map
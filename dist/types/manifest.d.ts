import type { PluginParam } from "./parameters";
import type { PluginUIDescriptor } from "./ui";
/** Semantic version string, e.g. "1.2.3" */
export type SemVer = `${number}.${number}.${number}`;
/** Plugin type identifier */
export type PluginType = "audio-effect" | "midi-effect" | "instrument" | "vocal-preset" | "shader";
/** Plugin pricing model */
export type PluginPricing = "free" | "paid";
/** Author / publisher information */
export interface PluginAuthor {
    /** Display name */
    readonly name: string;
    /** Homepage or portfolio URL */
    readonly url?: string;
    /** Contact email (never shown to end-users, only used for support) */
    readonly email?: string;
}
/**
 * Plugin manifest — the single source of truth for every plugin.
 *
 * Export a value conforming to this interface from your plugin module as
 * `export const manifest: PluginManifest = { ... }`.  CollabHut reads the
 * manifest at upload time to populate the marketplace listing and at runtime
 * to validate the loaded plugin against the executing CollabDAW version.
 *
 * @example
 * ```ts
 * import type { PluginManifest } from "@collabhut/plugin-sdk"
 *
 * export const manifest: PluginManifest = {
 *     id: "com.myorg.warm-compressor",
 *     name: "Warm Compressor",
 *     version: "1.0.0",
 *     type: "audio-effect",
 *     description: "Analogue-style VCA compressor with harmonic saturation.",
 *     author: { name: "Your Name", url: "https://example.com" },
 *     pricing: "paid",
 *     minApiVersion: "0.1.0",
 *     tags: ["dynamics", "compressor", "vintage"],
 * }
 * ```
 */
export interface PluginManifest {
    /**
     * Globally unique identifier in reverse-domain notation.
     * Must be stable — changing this after publication breaks licensing.
     * @example "com.myorg.warm-compressor"
     */
    readonly id: string;
    /** Human-readable display name shown in the DAW device browser */
    readonly name: string;
    /** Semantic version following semver.org */
    readonly version: SemVer;
    /** Plugin category — determines where it appears in the device browser */
    readonly type: PluginType;
    /**
     * Short description shown in the marketplace (max 280 characters).
     * Write this for musicians, not engineers.
     */
    readonly description: string;
    /** Author / publisher information */
    readonly author: PluginAuthor;
    /** Optional homepage URL for marketing / documentation */
    readonly homepage?: string;
    /** Tags for search and discoverability in the marketplace */
    readonly tags?: readonly string[];
    /**
     * Parameter definitions exposed to the DAW automation lane and UI.
     * Each param becomes a knob, slider, or toggle in the device editor.
     */
    readonly params?: readonly PluginParam[];
    /**
     * Pricing model.
     * - `"free"` — no purchase required; runs on all plans
     * - `"paid"` — requires a CollabHut marketplace purchase to use outside
     *              of a collaboration where another participant owns a licence
     */
    readonly pricing: PluginPricing;
    /**
     * Minimum @collabhut/plugin-sdk runtime version the plugin requires.
     * CollabDAW will refuse to load the plugin if the runtime version is lower.
     */
    readonly minApiVersion: SemVer;
    /**
     * Whether this plugin is compatible with ShaderToy integration.
     * Only relevant for `type: "shader"` plugins.
     * @default false
     */
    readonly shadertoyCompatible?: boolean;
    /**
     * Custom SVG icon (64×64 viewBox string) or a reference to an icon pack.
     * Falls back to a type-based default icon if omitted.
     */
    readonly icon?: string | PluginIconRef;
    /**
     * UI layout descriptor for the device editor panel.
     * If omitted, the DAW auto-generates a knob layout from `params`.
     */
    readonly ui?: PluginUIDescriptor;
}
/** Reference to an icon from a named icon pack */
export interface PluginIconRef {
    /** Icon pack name */
    readonly pack: "lucide" | "collabhut" | "custom";
    /** Icon identifier within the pack */
    readonly name: string;
    /** Optional hex colour for the icon tint */
    readonly color?: string;
}
//# sourceMappingURL=manifest.d.ts.map
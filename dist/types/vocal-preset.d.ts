/**
 * Vocal preset plugin type.
 *
 * Unlike audio/MIDI effect plugins, a vocal preset does **not** create Web
 * Audio nodes.  Instead it exports a static `VocalPreset` data object that
 * the DAW's built-in vocal processing chain reads and applies.
 *
 * This means:
 * - No sandbox risks from custom DSP code
 * - Zero latency — processed natively by CollabDAW's vocal engine
 * - Works with the Live Vocals module (`src/lib/live-vocals/`)
 *
 * @example
 * ```ts
 * import type { VocalPresetModule } from "@collabhut/plugin-sdk"
 *
 * const module: VocalPresetModule = {
 *     manifest: {
 *         id: "com.myorg.deep-trap-vocals",
 *         name: "Deep Trap Vocals",
 *         version: "1.0.0",
 *         type: "vocal-preset",
 *         description: "Hard-hitting trap vocal chain with heavy pitch correction",
 *         author: { name: "My Org" },
 *         pricing: "free",
 *         minApiVersion: "0.1.0",
 *     },
 *     preset: {
 *         inputGain: 0,
 *         outputGain: -3,
 *         eq: {
 *             enabled: true,
 *             bands: [
 *                 { frequency: 80,   gain: -6,  q: 0.7, type: "highpass" },
 *                 { frequency: 200,  gain: -3,  q: 1.2, type: "peaking"  },
 *                 { frequency: 3000, gain: 4,   q: 1.5, type: "peaking"  },
 *                 { frequency: 8000, gain: 5,   q: 0.8, type: "highshelf"},
 *                 { frequency: 16000,gain: -2,  q: 0.7, type: "highshelf"},
 *             ],
 *         },
 *         compressor: { enabled: true, threshold: -24, knee: 6, ratio: 6, attack: 0.003, release: 0.15, makeUpGain: 4 },
 *         pitchCorrection: { enabled: true, scale: "chromatic", strength: 0.9, speed: 0.05 },
 *         chorus:  { enabled: false, rate: 0.5, depth: 0.3, delay: 0.02, mix: 0.3 },
 *         reverb:  { enabled: true,  roomSize: 0.2, damping: 0.8, preDelay: 0.01, mix: 0.15 },
 *         delay:   { enabled: false, time: 0.25, feedback: 0.3, filter: 4000, mix: 0.2 },
 *         deEsser: { enabled: true,  frequency: 7500, threshold: -30, range: 12 },
 *         saturation: { enabled: true,  drive: 0.2, mix: 0.4 },
 *     },
 * }
 *
 * export default module
 * ```
 */
/** EQ band filter type */
export type EqBandType = "peaking" | "lowshelf" | "highshelf" | "lowpass" | "highpass" | "notch";
/** A single parametric EQ band */
export interface EqBand {
    readonly frequency: number;
    readonly gain: number;
    readonly q: number;
    readonly type: EqBandType;
}
/** 5-band parametric EQ settings */
export interface VocalEqSettings {
    readonly enabled: boolean;
    readonly bands: readonly [EqBand, EqBand, EqBand, EqBand, EqBand];
}
/** Dynamic compressor settings */
export interface VocalCompressorSettings {
    readonly enabled: boolean;
    readonly threshold: number;
    readonly knee: number;
    readonly ratio: number;
    readonly attack: number;
    readonly release: number;
    readonly makeUpGain: number;
}
/** De-esser settings */
export interface VocalDeEsserSettings {
    readonly enabled: boolean;
    readonly frequency: number;
    readonly threshold: number;
    readonly range: number;
}
/** Saturation / harmonic exciter */
export interface VocalSaturationSettings {
    readonly enabled: boolean;
    readonly drive: number;
    readonly mix: number;
}
/** Pitch correction settings */
export interface VocalPitchCorrectionSettings {
    readonly enabled: boolean;
    /**
     * Scale to snap to.
     * Use a note array for custom scales: `["C", "D", "E", "G", "A"]`
     */
    readonly scale: "chromatic" | "major" | "minor" | "pentatonic" | readonly string[];
    /** 0 = subtle, 1 = T-Pain hard-tune */
    readonly strength: number;
    /** Correction speed in seconds (lower = faster) */
    readonly speed: number;
    /** Musical key root note, e.g. "C", "F#" */
    readonly key?: string;
    /** Preserve natural formant character when shifting pitch */
    readonly formantPreservation?: boolean;
    /** 0–1, amount of natural vibrato to pass through */
    readonly vibratoAmount?: number;
    /** 0–1, micro-pitch randomisation for natural feel */
    readonly humanize?: number;
    /** Retune speed in milliseconds (0 = instant T-Pain, 50 = natural) */
    readonly retuneSpeed?: number;
}
/** Pop filter / subsonic cut to eliminate plosives and rumble */
export interface VocalPopFilterSettings {
    readonly enabled: boolean;
    /** Cutoff frequency in Hz (typically 60–120) */
    readonly frequency: number;
    /** Filter slope in dB/octave (12, 24, or 48) */
    readonly slope: 12 | 24 | 48;
}
/** Noise gate to suppress bleed and background noise */
export interface VocalGateSettings {
    readonly enabled: boolean;
    /** Threshold in dB below which audio is gated */
    readonly threshold: number;
    /** Attack time in seconds */
    readonly attack: number;
    /** Hold time in seconds — gate stays open after signal drops below threshold */
    readonly hold: number;
    /** Release time in seconds */
    readonly release: number;
}
/** Harmonic exciter / air control for presence and sparkle */
export interface VocalExciterSettings {
    readonly enabled: boolean;
    /** Centre frequency for presence band in Hz (typically 2–5 kHz) */
    readonly frequency: number;
    /** Presence amount 0–1 */
    readonly amount: number;
    /** High-shelf air sparkle amount 0–1 (above 10 kHz) */
    readonly airAmount: number;
}
/** Feedback protection — auto-detects and notch-filters feedback frequencies */
export interface VocalFeedbackProtectionSettings {
    readonly enabled: boolean;
    /** Detection sensitivity 0–1 (lower = more aggressive detection) */
    readonly sensitivity: number;
    /** Maximum number of simultaneous notch filters (1–5) */
    readonly maxNotches: number;
}
/** Brick-wall limiter for output protection */
export interface VocalLimiterSettings {
    readonly enabled: boolean;
    /** Ceiling in dB (typically -0.1 to -1.0) */
    readonly ceiling: number;
    /** Release time in milliseconds */
    readonly release: number;
}
/** Chorus effect settings */
export interface VocalChorusSettings {
    readonly enabled: boolean;
    readonly rate: number;
    readonly depth: number;
    readonly delay: number;
    readonly mix: number;
}
/** Convolution / algorithmic reverb settings */
export interface VocalReverbSettings {
    readonly enabled: boolean;
    readonly roomSize: number;
    readonly damping: number;
    readonly preDelay: number;
    readonly mix: number;
}
/** Stereo delay settings */
export interface VocalDelaySettings {
    readonly enabled: boolean;
    readonly time: number;
    readonly feedback: number;
    readonly filter: number;
    readonly mix: number;
}
/** Complete vocal signal chain preset */
export interface VocalPreset {
    readonly inputGain: number;
    readonly outputGain: number;
    readonly popFilter?: VocalPopFilterSettings;
    readonly gate?: VocalGateSettings;
    readonly eq: VocalEqSettings;
    readonly deEsser: VocalDeEsserSettings;
    readonly compressor: VocalCompressorSettings;
    readonly saturation: VocalSaturationSettings;
    readonly exciter?: VocalExciterSettings;
    readonly pitchCorrection: VocalPitchCorrectionSettings;
    readonly chorus: VocalChorusSettings;
    readonly reverb: VocalReverbSettings;
    readonly delay: VocalDelaySettings;
    readonly feedbackProtection?: VocalFeedbackProtectionSettings;
    readonly limiter?: VocalLimiterSettings;
}
import type { PluginManifest } from "./manifest";
/** Full vocal-preset module shape */
export interface VocalPresetModule {
    readonly manifest: PluginManifest & {
        readonly type: "vocal-preset";
    };
    readonly preset: VocalPreset;
}
//# sourceMappingURL=vocal-preset.d.ts.map
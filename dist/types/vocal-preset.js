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
export {};

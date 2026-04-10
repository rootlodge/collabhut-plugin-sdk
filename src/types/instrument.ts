import type { InstrumentContext } from "./context"
import type { MidiEvent } from "./midi-effect"
import type { PluginManifest } from "./manifest"

/**
 * An individual voice instance returned by `noteOn`.
 *
 * The DAW keeps a reference per active voice and calls `stop` when the
 * corresponding note-off arrives (or when voices are stolen for polyphony).
 */
export interface InstrumentVoice {
    /** AudioNode carrying this voice's audio signal — host connects it to the track bus */
    readonly output: AudioNode
    /**
     * Stop (release) the voice.
     * @param velocity  Release velocity, 0–127
     * @param time      AudioContext time at which the release should begin
     */
    stop(velocity: number, time: number): void
    /**
     * Kill the voice immediately with no release tail.
     * Used for voice stealing or when the project stops.
     */
    kill(): void
}

/**
 * Polyphonic instrument plugin.
 *
 * The DAW calls `noteOn` for every note and stores the returned voice.
 * When the note ends it calls `voice.stop()`.  If polyphony is exceeded it
 * calls `voice.kill()` on the oldest voice before starting a new one.
 *
 * @example
 * ```ts
 * import type { InstrumentFactory, InstrumentVoice } from "@collabhut/plugin-sdk"
 *
 * export const factory: InstrumentFactory = (context) => ({
 *     noteOn(note, velocity, time) {
 *         const osc = context.audioContext.createOscillator()
 *         const gain = context.audioContext.createGain()
 *         osc.frequency.value = 440 * 2 ** ((note - 69) / 12)
 *         gain.gain.setValueAtTime(velocity / 127, time)
 *         osc.connect(gain)
 *         osc.start(time)
 *         return {
 *             output: gain,
 *             stop(_vel, releaseTime) {
 *                 gain.gain.setTargetAtTime(0, releaseTime, 0.1)
 *                 osc.stop(releaseTime + 0.5)
 *             },
 *             kill() { osc.stop(); gain.disconnect() },
 *         }
 *     },
 *     onMidi(_event) {},
 *     dispose() {},
 * })
 * ```
 */
export interface InstrumentPlugin {
    /**
     * Start a new voice for the given MIDI note.
     * @param note      MIDI note number (0–127)
     * @param velocity  Attack velocity (0–127)
     * @param time      AudioContext time for the note start
     * @returns A voice object the DAW will manage
     */
    noteOn(note: number, velocity: number, time: number): InstrumentVoice
    /**
     * Handle non-note MIDI events (CC, pitch bend, aftertouch, etc.).
     * Called alongside the voice lifecycle — useful for mod-wheel, portamento, etc.
     */
    onMidi(event: MidiEvent): void
    /** Called when the plugin is removed or the project closes */
    dispose(): void
}

export type InstrumentFactory = (
    context: InstrumentContext,
    params: Readonly<Record<string, number | boolean | string>>,
    manifest: PluginManifest
) => InstrumentPlugin

/** Full instrument module shape */
export interface InstrumentModule {
    readonly manifest: PluginManifest & { readonly type: "instrument" }
    readonly factory: InstrumentFactory
}

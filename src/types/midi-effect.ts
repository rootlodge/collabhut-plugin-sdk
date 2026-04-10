import type { PluginContext } from "./context"
import type { PluginParam } from "./parameters"
import type { PluginManifest } from "./manifest"

/** Standard MIDI event types */
export type MidiEventType =
    | "note-on"
    | "note-off"
    | "control-change"
    | "pitch-bend"
    | "aftertouch"
    | "poly-aftertouch"
    | "program-change"

/** Base MIDI event — every event carries timing in beats from song start */
interface MidiEventBase {
    readonly channel: number   // 0–15
    readonly beatTime: number  // position in beats (fractional)
}

/** A MIDI note-on event */
export interface MidiNoteOnEvent extends MidiEventBase {
    readonly type: "note-on"
    readonly note: number      // 0–127
    readonly velocity: number  // 0–127
}

/** A MIDI note-off event */
export interface MidiNoteOffEvent extends MidiEventBase {
    readonly type: "note-off"
    readonly note: number      // 0–127
    readonly velocity: number  // 0–127 (release velocity)
}

/** A MIDI continuous controller event */
export interface MidiControlChangeEvent extends MidiEventBase {
    readonly type: "control-change"
    readonly controller: number  // 0–127
    readonly value: number       // 0–127
}

/** A MIDI pitch bend event */
export interface MidiPitchBendEvent extends MidiEventBase {
    readonly type: "pitch-bend"
    readonly value: number  // -8192 to 8191
}

/** Channel pressure (aftertouch) */
export interface MidiAftertouchEvent extends MidiEventBase {
    readonly type: "aftertouch"
    readonly pressure: number  // 0–127
}

/** Poly aftertouch (note-specific pressure) */
export interface MidiPolyAftertouchEvent extends MidiEventBase {
    readonly type: "poly-aftertouch"
    readonly note: number      // 0–127
    readonly pressure: number  // 0–127
}

/** Program change */
export interface MidiProgramChangeEvent extends MidiEventBase {
    readonly type: "program-change"
    readonly program: number  // 0–127
}

/** Discriminated union of all MIDI events */
export type MidiEvent =
    | MidiNoteOnEvent
    | MidiNoteOffEvent
    | MidiControlChangeEvent
    | MidiPitchBendEvent
    | MidiAftertouchEvent
    | MidiPolyAftertouchEvent
    | MidiProgramChangeEvent

/**
 * MIDI effect processor.
 *
 * Receives the list of MIDI events for the current audio block and returns
 * transformed / generated events.  Returning an empty array silences all
 * MIDI output for that block.
 *
 * @example
 * ```ts
 * import type { MidiEffectFactory, MidiEvent } from "@collabhut/plugin-sdk"
 *
 * // Chord generator — fan every note-on into a major chord
 * export const factory: MidiEffectFactory = (_context, params) => ({
 *     process(events) {
 *         const out: MidiEvent[] = []
 *         for (const ev of events) {
 *             out.push(ev)
 *             if (ev.type === "note-on") {
 *                 out.push({ ...ev, note: ev.note + 4 })  // major third
 *                 out.push({ ...ev, note: ev.note + 7 })  // perfect fifth
 *             } else if (ev.type === "note-off") {
 *                 out.push({ ...ev, note: ev.note + 4 })
 *                 out.push({ ...ev, note: ev.note + 7 })
 *             }
 *         }
 *         return out
 *     },
 *     dispose() {},
 * })
 * ```
 */
export interface MidiEffectPlugin {
    /**
     * Called once per audio block.
     * @param events   Events arriving in this block (sorted by beatTime)
     * @returns        Transformed or generated events for downstream
     */
    process(events: ReadonlyArray<MidiEvent>): MidiEvent[]
    /** Called by the DAW when the plugin is removed or the project closes */
    dispose(): void
}

export type MidiEffectFactory = (
    context: PluginContext,
    params: Readonly<Record<string, number | boolean | string>>,
    manifest: PluginManifest
) => MidiEffectPlugin

/** Full MIDI-effect module shape */
export interface MidiEffectModule {
    readonly manifest: PluginManifest & { readonly type: "midi-effect" }
    readonly factory: MidiEffectFactory
}

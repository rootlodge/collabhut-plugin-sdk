import type { PluginContext } from "./context";
import type { PluginManifest } from "./manifest";
/** Standard MIDI event types */
export type MidiEventType = "note-on" | "note-off" | "control-change" | "pitch-bend" | "aftertouch" | "poly-aftertouch" | "program-change";
/** Base MIDI event — every event carries timing in beats from song start */
interface MidiEventBase {
    readonly channel: number;
    readonly beatTime: number;
}
/** A MIDI note-on event */
export interface MidiNoteOnEvent extends MidiEventBase {
    readonly type: "note-on";
    readonly note: number;
    readonly velocity: number;
}
/** A MIDI note-off event */
export interface MidiNoteOffEvent extends MidiEventBase {
    readonly type: "note-off";
    readonly note: number;
    readonly velocity: number;
}
/** A MIDI continuous controller event */
export interface MidiControlChangeEvent extends MidiEventBase {
    readonly type: "control-change";
    readonly controller: number;
    readonly value: number;
}
/** A MIDI pitch bend event */
export interface MidiPitchBendEvent extends MidiEventBase {
    readonly type: "pitch-bend";
    readonly value: number;
}
/** Channel pressure (aftertouch) */
export interface MidiAftertouchEvent extends MidiEventBase {
    readonly type: "aftertouch";
    readonly pressure: number;
}
/** Poly aftertouch (note-specific pressure) */
export interface MidiPolyAftertouchEvent extends MidiEventBase {
    readonly type: "poly-aftertouch";
    readonly note: number;
    readonly pressure: number;
}
/** Program change */
export interface MidiProgramChangeEvent extends MidiEventBase {
    readonly type: "program-change";
    readonly program: number;
}
/** Discriminated union of all MIDI events */
export type MidiEvent = MidiNoteOnEvent | MidiNoteOffEvent | MidiControlChangeEvent | MidiPitchBendEvent | MidiAftertouchEvent | MidiPolyAftertouchEvent | MidiProgramChangeEvent;
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
    process(events: ReadonlyArray<MidiEvent>): MidiEvent[];
    /** Called by the DAW when the plugin is removed or the project closes */
    dispose(): void;
}
export type MidiEffectFactory = (context: PluginContext, params: Readonly<Record<string, number | boolean | string>>, manifest: PluginManifest) => MidiEffectPlugin;
/** Full MIDI-effect module shape */
export interface MidiEffectModule {
    readonly manifest: PluginManifest & {
        readonly type: "midi-effect";
    };
    readonly factory: MidiEffectFactory;
}
export {};
//# sourceMappingURL=midi-effect.d.ts.map
/**
 * Note utility helpers for @collabhut/plugin-sdk.
 *
 * All functions are pure and zero-dependency.  Safe to call from a Worker.
 *
 * ## MIDI note numbers
 * Middle C (C4) = MIDI 60.  A4 (concert pitch) = MIDI 69 = 440 Hz.
 */
/**
 * Convert a MIDI note number to its frequency in Hz.
 *
 * Uses equal temperament at A4 = 440 Hz.
 *
 * @example
 * noteToHz(69)  // 440
 * noteToHz(60)  // 261.63 (middle C)
 * noteToHz(57)  // 220 (A3)
 */
export declare function noteToHz(midi: number): number;
/**
 * Convert a frequency in Hz to the nearest MIDI note number.
 *
 * The result is rounded to the nearest integer.
 *
 * @example
 * hzToNote(440)   // 69
 * hzToNote(261.63)// 60
 */
export declare function hzToNote(hz: number): number;
/**
 * Convert a frequency in Hz to a precise (fractional) MIDI note number.
 *
 * Useful for pitch detection where you want the exact pitch, not just the
 * nearest semitone.
 *
 * @example
 * hzToNoteFractional(450) // ~69.39
 */
export declare function hzToNoteFractional(hz: number): number;
/** Note names in order (chromatic, starting from C) */
declare const NOTE_NAMES: readonly ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export type NoteName = (typeof NOTE_NAMES)[number];
/**
 * Convert a MIDI note number to a human-readable note name with octave.
 *
 * @example
 * midiToName(60)  // "C4"
 * midiToName(69)  // "A4"
 * midiToName(57)  // "A3"
 */
export declare function midiToName(midi: number): string;
/**
 * Convert a note name + octave to a MIDI note number.
 *
 * @example
 * nameToMidi("C", 4)   // 60
 * nameToMidi("A", 4)   // 69
 * nameToMidi("A#", 3)  // 58
 */
export declare function nameToMidi(note: NoteName, octave: number): number;
/**
 * Return the number of semitones between two MIDI note numbers.
 * Result is signed — positive if `b > a`.
 *
 * @example
 * semitonesBetween(60, 67)  //  7 (perfect fifth up)
 * semitonesBetween(69, 60)  // -9
 */
export declare function semitonesBetween(a: number, b: number): number;
/**
 * Transpose a MIDI note by a number of semitones, clamped to 0–127.
 *
 * @example
 * transpose(60, 7)   // 67 (C4 → G4)
 * transpose(60, -12) // 48 (C4 → C3)
 */
export declare function transpose(midi: number, semitones: number): number;
/**
 * Convert beats to seconds given a BPM.
 *
 * @example
 * beatsToSeconds(1, 120)  // 0.5
 * beatsToSeconds(4, 90)   // 2.666...
 */
export declare function beatsToSeconds(beats: number, bpm: number): number;
/**
 * Convert seconds to beats given a BPM.
 *
 * @example
 * secondsToBeats(0.5, 120) // 1
 * secondsToBeats(2, 90)    // 3
 */
export declare function secondsToBeats(seconds: number, bpm: number): number;
/**
 * Convert a linear gain value (0–∞) to decibels.
 * Returns `-Infinity` for gain = 0.
 *
 * @example
 * gainToDb(1)   // 0
 * gainToDb(0.5) // -6.02
 */
export declare function gainToDb(gain: number): number;
/**
 * Convert decibels to a linear gain value.
 *
 * @example
 * dbToGain(0)  // 1
 * dbToGain(-6) // ~0.5012
 */
export declare function dbToGain(db: number): number;
/**
 * Clamp a value between a minimum and maximum.
 *
 * @example
 * clamp(1.5, 0, 1)  // 1
 * clamp(-0.5, 0, 1) // 0
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Linear interpolation between two values.
 *
 * @param t  Blend factor, 0–1
 * @example
 * lerp(0, 100, 0.5) // 50
 */
export declare function lerp(a: number, b: number, t: number): number;
export {};
//# sourceMappingURL=note-utils.d.ts.map
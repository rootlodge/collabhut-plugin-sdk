/**
 * Typed message protocol for plugin ↔ host communication.
 *
 * Plugins execute inside a sandboxed Web Worker.  All communication with the
 * host DAW happens via `postMessage` with these discriminated-union types.
 *
 * ## Architecture
 * ```
 * Host (main thread)                Plugin (Worker)
 *       │                                  │
 *       │──── HostToPluginMessage ────────►│  host → plugin commands
 *       │◄─── PluginToHostMessage ─────────│  plugin → host events
 * ```
 *
 * Plugin authors **do not** import or use these types directly — they are
 * consumed by the DAW runtime.  They are documented here for those building
 * plugin host environments or tooling.
 */
/** Initialize the plugin.  Sent once immediately after the Worker starts. */
export interface PluginInitMessage {
    readonly type: "init";
    /** Transferable SharedArrayBuffer for lock-free transport state reads */
    readonly transportBuffer: SharedArrayBuffer;
    /** Plugin parameter initial values */
    readonly params: Readonly<Record<string, number | boolean | string>>;
    readonly sampleRate: number;
    readonly blockSize: number;
}
/** Update one or more parameter values */
export interface PluginParamsUpdateMessage {
    readonly type: "params-update";
    readonly params: Readonly<Record<string, number | boolean | string>>;
}
/** Process one audio block (audio-effect plugins only) */
export interface PluginProcessMessage {
    readonly type: "process";
    /** Interleaved float32 samples, transferred (zero-copy) */
    readonly inputBuffer: Float32Array;
    readonly numChannels: number;
    readonly numFrames: number;
}
/** Send MIDI events for this block (midi-effect / instrument plugins) */
export interface PluginMidiMessage {
    readonly type: "midi";
    readonly events: ReadonlyArray<{
        readonly channel: number;
        readonly beatTime: number;
        readonly data: readonly number[];
    }>;
}
/** Trigger note on (instrument plugins only) */
export interface PluginNoteOnMessage {
    readonly type: "note-on";
    readonly note: number;
    readonly velocity: number;
    readonly time: number;
}
/** Trigger note off (instrument plugins only) */
export interface PluginNoteOffMessage {
    readonly type: "note-off";
    readonly note: number;
    readonly velocity: number;
    readonly time: number;
}
/** Dispose and terminate the plugin */
export interface PluginDisposeMessage {
    readonly type: "dispose";
}
export type HostToPluginMessage = PluginInitMessage | PluginParamsUpdateMessage | PluginProcessMessage | PluginMidiMessage | PluginNoteOnMessage | PluginNoteOffMessage | PluginDisposeMessage;
/** Plugin is ready after init */
export interface PluginReadyEvent {
    readonly type: "ready";
    readonly manifestId: string;
    readonly apiVersion: string;
}
/** Processed audio output (audio-effect plugins) */
export interface PluginAudioOutputEvent {
    readonly type: "audio-output";
    /** Interleaved float32 samples, transferred (zero-copy) */
    readonly outputBuffer: Float32Array;
    readonly numChannels: number;
    readonly numFrames: number;
}
/** MIDI output events (midi-effect plugins) */
export interface PluginMidiOutputEvent {
    readonly type: "midi-output";
    readonly events: ReadonlyArray<{
        readonly channel: number;
        readonly beatTime: number;
        readonly data: readonly number[];
    }>;
}
/** Plugin encountered an error */
export interface PluginErrorEvent {
    readonly type: "error";
    /** Human-readable description of the error */
    readonly message: string;
    /** Optional stack trace (stripped in production builds) */
    readonly stack?: string;
}
/** Plugin requests to fetch a CDN asset (host performs the fetch and replies) */
export interface PluginFetchRequestEvent {
    readonly type: "fetch-request";
    readonly requestId: string;
    /** Must be a URL on cdn.storage.collabhut.com — rejected otherwise */
    readonly url: string;
}
/** Host response to a `fetch-request` */
export interface PluginFetchResponseMessage {
    readonly type: "fetch-response";
    readonly requestId: string;
    readonly ok: boolean;
    /** Transferred ArrayBuffer on success */
    readonly data?: ArrayBuffer;
    readonly error?: string;
}
export type PluginToHostEvent = PluginReadyEvent | PluginAudioOutputEvent | PluginMidiOutputEvent | PluginErrorEvent | PluginFetchRequestEvent;
export type HostToPluginExtended = HostToPluginMessage | PluginFetchResponseMessage;
//# sourceMappingURL=events.d.ts.map
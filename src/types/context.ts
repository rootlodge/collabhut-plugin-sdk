/**
 * Runtime context provided to every plugin factory.
 *
 * The context object is the plugin's only gateway to the host environment.
 * All properties are read-only — plugins cannot modify host state directly.
 */
export interface PluginContext {
    /** Web Audio API context.  Use this to create nodes and schedule events. */
    readonly audioContext: AudioContext
    /**
     * Current sample rate in Hz.
     * Always equal to `audioContext.sampleRate`.
     */
    readonly sampleRate: number
    /**
     * Current tempo in beats per minute.
     * Reactive: you should re-read this in every `process()` call for DAW sync.
     */
    readonly bpm: number
    /** Current transport position in beats (fractions of a beat allowed) */
    readonly positionBeats: number
    /** `true` when the DAW transport is rolling */
    readonly isPlaying: boolean
    /**
     * Fetch a resource from CollabHut CDN.
     * Only HTTPS URLs on `cdn.storage.collabhut.com` are allowed.
     * Arbitrary network access is blocked inside the plugin sandbox.
     */
    fetchAsset(url: string): Promise<ArrayBuffer>
}

/**
 * Runtime context provided exclusively to instrument plugins.
 * Extends PluginContext with polyphonic voice management.
 */
export interface InstrumentContext extends PluginContext {
    /** Maximum number of simultaneous voices the host will attempt */
    readonly maxPolyphony: number
}

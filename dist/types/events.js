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
export {};

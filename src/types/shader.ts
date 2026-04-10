import type { PluginManifest } from "./manifest"

/**
 * GLSL uniform value types that a shader plugin may declare.
 * The DAW populates these automatically from session state or from plugin params.
 */
export type UniformType =
    | "float"
    | "int"
    | "vec2"
    | "vec3"
    | "vec4"
    | "bool"
    | "sampler2D"

/** A declared GLSL uniform with its source mapping */
export interface ShaderUniform {
    /** Uniform name as it appears in the GLSL source */
    readonly name: string
    readonly type: UniformType
    /**
     * How this uniform is populated at runtime:
     * - `"param"` — maps to a plugin param by id (must match a `manifest.params` entry)
     * - `"audio-rms"` — root mean square of the current audio block (float, 0–1)
     * - `"audio-spectrum"` — frequency magnitudes as a sampler2D (1×512 texture)
     * - `"beat"` — current fractional beat position (float)
     * - `"bpm"` — session BPM (float)
     * - `"time"` — elapsed playback time in seconds (matches ShaderToy `iTime`)
     * - `"resolution"` — canvas size as vec2 (matches ShaderToy `iResolution`)
     * - `"mouse"` — cursor position as vec2 (matches ShaderToy `iMouse`)
     */
    readonly source:
        | "param"
        | "audio-rms"
        | "audio-spectrum"
        | "beat"
        | "bpm"
        | "time"
        | "resolution"
        | "mouse"
    /** Required when source is "param" — must match a manifest.params entry id */
    readonly paramId?: string
}

/**
 * Shader plugin definition.
 *
 * The `glsl` field must be a valid WebGL2 fragment shader.
 *
 * ### ShaderToy Compatibility
 * When `manifest.shadertoyCompatible` is `true`, the DAW automatically injects
 * the standard ShaderToy uniforms (`iTime`, `iResolution`, `iMouse`,
 * `iChannel0`–`iChannel3`) so ShaderToy code can be pasted with minimal changes.
 *
 * You **do not** need to declare those as `uniforms` — they are added
 * automatically.  Custom uniforms you declare are added on top.
 *
 * ### Security
 * Shader source is validated server-side before being accepted by the
 * marketplace.  Prohibited constructs: infinite loops without exit guards,
 * texture fetches to external URIs, GLSL extensions that could leak device
 * fingerprints.
 *
 * @example Basic audio-reactive shader
 * ```ts
 * import type { ShaderModule } from "@collabhut/plugin-sdk"
 *
 * const mod: ShaderModule = {
 *     manifest: {
 *         id: "com.myorg.pulse-visualiser",
 *         name: "Pulse Visualiser",
 *         version: "1.0.0",
 *         type: "shader",
 *         description: "Circle that pulses with the music",
 *         author: { name: "My Org" },
 *         pricing: "free",
 *         minApiVersion: "0.1.0",
 *         shadertoyCompatible: false,
 *     },
 *     shader: {
 *         glsl: `
 *             precision mediump float;
 *             uniform vec2  uResolution;
 *             uniform float uRms;
 *             void main() {
 *                 vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
 *                 float r = length(uv);
 *                 float circle = smoothstep(0.5 + uRms * 0.4, 0.49 + uRms * 0.4, r);
 *                 gl_FragColor = vec4(vec3(circle), 1.0);
 *             }
 *         `,
 *         uniforms: [
 *             { name: "uResolution", type: "vec2",  source: "resolution" },
 *             { name: "uRms",        type: "float", source: "audio-rms"  },
 *         ],
 *     },
 * }
 *
 * export default mod
 * ```
 *
 * @example ShaderToy port
 * ```ts
 * // manifest.shadertoyCompatible = true
 * // iTime, iResolution, iMouse, iChannel0 are pre-injected
 * const glsl = `
 *     void mainImage(out vec4 fragColor, in vec2 fragCoord) {
 *         vec2 uv = fragCoord / iResolution.xy;
 *         fragColor = vec4(uv, 0.5 + 0.5 * sin(iTime), 1.0);
 *     }
 * `
 * ```
 */
export interface ShaderDefinition {
    /** Fragment shader source (WebGL2 / GLSL ES 300 or 100) */
    readonly glsl: string
    /** Custom uniform declarations */
    readonly uniforms?: readonly ShaderUniform[]
}

/** Full shader plugin module shape */
export interface ShaderModule {
    readonly manifest: PluginManifest & {
        readonly type: "shader"
        readonly shadertoyCompatible?: boolean
    }
    readonly shader: ShaderDefinition
}

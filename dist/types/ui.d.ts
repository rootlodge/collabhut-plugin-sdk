/**
 * UI layout descriptor for plugin device editors.
 *
 * Plugins can optionally declare a `ui` property in their manifest to
 * describe how the device editor should render their controls. If omitted,
 * the DAW auto-generates a layout from the `params` array.
 *
 * @example
 * ```ts
 * import type { PluginUIDescriptor } from "@collabhut/plugin-sdk"
 *
 * const ui: PluginUIDescriptor = {
 *     layout: "column",
 *     sections: [
 *         {
 *             label: "Dynamics",
 *             controls: [
 *                 { type: "knob", paramId: "threshold", size: "large", bipolar: true },
 *                 { type: "knob", paramId: "ratio" },
 *                 { type: "slider", paramId: "mix", orientation: "horizontal" },
 *                 { type: "meter", channel: "gain-reduction" },
 *             ],
 *         },
 *         {
 *             label: "Options",
 *             controls: [
 *                 { type: "toggle", paramId: "softClip", onLabel: "On", offLabel: "Off" },
 *                 { type: "dropdown", paramId: "mode" },
 *             ],
 *         },
 *     ],
 * }
 * ```
 */
export interface PluginUIDescriptor {
    /** Top-level layout direction for sections */
    readonly layout: "row" | "column" | "grid";
    /** Ordered sections of controls */
    readonly sections: readonly UISection[];
}
/** A named group of controls rendered together */
export interface UISection {
    /** Optional heading shown above the section */
    readonly label?: string;
    /** Controls within this section, rendered in order */
    readonly controls: readonly UIControl[];
    /** Optional number of grid columns (only applies when parent layout is "grid") */
    readonly columns?: number;
}
/** Union of all supported UI control types */
export type UIControl = UIKnob | UISlider | UIToggle | UIDropdown | UIMeter | UILabel | UIXYPad | UISpacer | UIWaveform | UISpectrum | UIEnvelope | UISignalFlow | UIRadialGroup | UIToggleGrid;
/** Rotary knob control bound to a range parameter */
export interface UIKnob {
    readonly type: "knob";
    /** Must match a `RangeParam.id` from the manifest */
    readonly paramId: string;
    /** Visual size — affects both the knob diameter and label font size */
    readonly size?: "small" | "medium" | "large";
    /** Hex colour for the value arc, e.g. `"#3b82f6"` */
    readonly color?: string;
    /** If true, the knob is centred at 12-o'clock (for params where 0 is the centre) */
    readonly bipolar?: boolean;
}
/** Linear slider control bound to a range parameter */
export interface UISlider {
    readonly type: "slider";
    /** Must match a `RangeParam.id` from the manifest */
    readonly paramId: string;
    readonly orientation?: "horizontal" | "vertical";
    /** Show numeric value next to the slider */
    readonly showValue?: boolean;
}
/** On/off toggle button bound to a boolean parameter */
export interface UIToggle {
    readonly type: "toggle";
    /** Must match a `BoolParam.id` from the manifest */
    readonly paramId: string;
    readonly onLabel?: string;
    readonly offLabel?: string;
}
/** Dropdown selector bound to a choice parameter */
export interface UIDropdown {
    readonly type: "dropdown";
    /** Must match a `ChoiceParam.id` from the manifest */
    readonly paramId: string;
}
/** Real-time level meter (peak + RMS) */
export interface UIMeter {
    readonly type: "meter";
    /** Which signal to meter */
    readonly channel: "input" | "output" | "gain-reduction";
    readonly orientation?: "horizontal" | "vertical";
}
/** Static text label or heading */
export interface UILabel {
    readonly type: "label";
    readonly text: string;
    readonly style?: "heading" | "caption" | "value";
}
/** Two-dimensional pad that controls two parameters simultaneously */
export interface UIXYPad {
    readonly type: "xy-pad";
    /** Must match a `RangeParam.id` for the X axis */
    readonly xParamId: string;
    /** Must match a `RangeParam.id` for the Y axis */
    readonly yParamId: string;
    /** Pixel size of the pad (default 120) */
    readonly size?: number;
}
/** Empty spacer for layout alignment */
export interface UISpacer {
    readonly type: "spacer";
    /** Width in pixels (horizontal layouts) or height (vertical layouts) */
    readonly size?: number;
}
/** Real-time waveform display with optional gain tracking */
export interface UIWaveform {
    readonly type: "waveform";
    /** Which signal to visualize */
    readonly channel: "input" | "output" | "sidechain";
    /** Canvas width in pixels (default 200) */
    readonly width?: number;
    /** Canvas height in pixels (default 64) */
    readonly height?: number;
    /** Hex colour for the waveform stroke */
    readonly color?: string;
    /** Fill style: "none", "gradient", or "solid" (default "gradient") */
    readonly fill?: "none" | "gradient" | "solid";
}
/** FFT spectrum analyzer display */
export interface UISpectrum {
    readonly type: "spectrum";
    /** Which signal to analyze */
    readonly channel: "input" | "output" | "sidechain";
    /** Canvas width in pixels (default 200) */
    readonly width?: number;
    /** Canvas height in pixels (default 80) */
    readonly height?: number;
    /** Display mode (default "bars") */
    readonly mode?: "bars" | "line" | "filled";
    /** Hex colour for the spectrum */
    readonly color?: string;
    /** FFT size: 256, 512, 1024, 2048, 4096 (default 2048) */
    readonly fftSize?: 256 | 512 | 1024 | 2048 | 4096;
}
/** ADSR envelope editor bound to attack/decay/sustain/release params */
export interface UIEnvelope {
    readonly type: "envelope";
    /** Param ID for attack time */
    readonly attackParamId: string;
    /** Param ID for decay time */
    readonly decayParamId: string;
    /** Param ID for sustain level */
    readonly sustainParamId: string;
    /** Param ID for release time */
    readonly releaseParamId: string;
    /** Canvas width in pixels (default 200) */
    readonly width?: number;
    /** Canvas height in pixels (default 80) */
    readonly height?: number;
    /** Hex colour for the envelope curve */
    readonly color?: string;
}
/** Signal flow visualization (gain reduction, input/output levels) */
export interface UISignalFlow {
    readonly type: "signal-flow";
    /** Stages in the processing chain to visualize */
    readonly stages: readonly UISignalFlowStage[];
    /** Orientation (default "horizontal") */
    readonly orientation?: "horizontal" | "vertical";
}
/** Individual stage in a signal flow visualization */
export interface UISignalFlowStage {
    readonly label: string;
    /** Meter channel for this stage */
    readonly channel: "input" | "output" | "gain-reduction";
    /** Hex colour for this stage */
    readonly color?: string;
}
/** Group of radial knobs arranged in a circular layout */
export interface UIRadialGroup {
    readonly type: "radial-group";
    /** Param IDs to display as radial controls */
    readonly paramIds: readonly string[];
    /** Diameter of the group in pixels (default 160) */
    readonly diameter?: number;
    /** Hex colour for the arcs */
    readonly color?: string;
}
/** Grid of toggle buttons for multi-state selection (e.g., step sequencer) */
export interface UIToggleGrid {
    readonly type: "toggle-grid";
    /** Param IDs mapped to each toggle cell */
    readonly paramIds: readonly string[];
    /** Number of columns in the grid */
    readonly columns: number;
    /** Hex colour for active cells */
    readonly activeColor?: string;
    /** Hex colour for inactive cells */
    readonly inactiveColor?: string;
}
//# sourceMappingURL=ui.d.ts.map
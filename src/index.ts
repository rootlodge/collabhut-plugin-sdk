// Types
export type { PluginManifest, PluginType, PluginPricing, SemVer, PluginAuthor, PluginIconRef } from "./types/manifest"
export type { PluginParam, RangeParam, BoolParam, ChoiceParam, ParamCurve, ParamValues } from "./types/parameters"
export type { PluginContext, InstrumentContext } from "./types/context"

// UI Descriptor
export type {
    PluginUIDescriptor,
    UISection,
    UIControl,
    UIKnob,
    UISlider,
    UIToggle,
    UIDropdown,
    UIMeter,
    UILabel,
    UIXYPad,
    UISpacer,
} from "./types/ui"

// Presets
export type {
    ShareablePreset,
    ShareableVocalPreset,
} from "./types/preset"

// Audio Effect
export type {
    AudioEffectIO,
    AudioEffectFactory,
    AudioEffectModule,
} from "./types/audio-effect"

// MIDI Effect
export type {
    MidiEvent,
    MidiEventType,
    MidiNoteOnEvent,
    MidiNoteOffEvent,
    MidiControlChangeEvent,
    MidiPitchBendEvent,
    MidiAftertouchEvent,
    MidiPolyAftertouchEvent,
    MidiProgramChangeEvent,
    MidiEffectPlugin,
    MidiEffectFactory,
    MidiEffectModule,
} from "./types/midi-effect"

// Instrument
export type {
    InstrumentVoice,
    InstrumentPlugin,
    InstrumentFactory,
    InstrumentModule,
} from "./types/instrument"

// Vocal Preset
export type {
    EqBand,
    EqBandType,
    VocalEqSettings,
    VocalCompressorSettings,
    VocalDeEsserSettings,
    VocalSaturationSettings,
    VocalPitchCorrectionSettings,
    VocalPopFilterSettings,
    VocalGateSettings,
    VocalExciterSettings,
    VocalFeedbackProtectionSettings,
    VocalLimiterSettings,
    VocalChorusSettings,
    VocalReverbSettings,
    VocalDelaySettings,
    VocalPreset,
    VocalPresetModule,
} from "./types/vocal-preset"

// Shader
export type {
    UniformType,
    ShaderUniform,
    ShaderDefinition,
    ShaderModule,
} from "./types/shader"

// Licensing
export type {
    CollaborationAccess,
    LicenseToken,
    LicenseGranted,
    LicenseDenied,
    LicenseCheckResult,
    LicenseChecker,
} from "./types/licensing"

// Events (host ↔ plugin Worker protocol)
export type {
    HostToPluginMessage,
    HostToPluginExtended,
    PluginToHostEvent,
    PluginInitMessage,
    PluginParamsUpdateMessage,
    PluginProcessMessage,
    PluginMidiMessage,
    PluginNoteOnMessage,
    PluginNoteOffMessage,
    PluginDisposeMessage,
    PluginReadyEvent,
    PluginAudioOutputEvent,
    PluginMidiOutputEvent,
    PluginErrorEvent,
    PluginFetchRequestEvent,
    PluginFetchResponseMessage,
} from "./types/events"

// Macro Plugin
export type {
    MacroStage,
    MacroControlMapping,
    MacroControl,
    MacroPluginDescriptor,
    MacroPluginManifest,
    MacroPluginModule,
} from "./types/macro-plugin"
export {
    applyMacroControl,
    interpolatePresets,
    randomizeParams,
} from "./types/macro-plugin"

// Helpers (runtime values, not just types)
export {
    noteToHz,
    hzToNote,
    hzToNoteFractional,
    midiToName,
    nameToMidi,
    semitonesBetween,
    transpose,
    beatsToSeconds,
    secondsToBeats,
    gainToDb,
    dbToGain,
    clamp,
    lerp,
} from "./helpers/note-utils"
export type { NoteName } from "./helpers/note-utils"

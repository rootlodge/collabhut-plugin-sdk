export type { PluginManifest, PluginType, PluginPricing, SemVer, PluginAuthor, PluginIconRef } from "./types/manifest";
export type { PluginParam, RangeParam, BoolParam, ChoiceParam, ParamCurve, ParamValues } from "./types/parameters";
export type { PluginContext, InstrumentContext } from "./types/context";
export type { PluginUIDescriptor, UISection, UIControl, UIKnob, UISlider, UIToggle, UIDropdown, UIMeter, UILabel, UIXYPad, UISpacer, } from "./types/ui";
export type { ShareablePreset, ShareableVocalPreset, } from "./types/preset";
export type { AudioEffectIO, AudioEffectFactory, AudioEffectModule, } from "./types/audio-effect";
export type { MidiEvent, MidiEventType, MidiNoteOnEvent, MidiNoteOffEvent, MidiControlChangeEvent, MidiPitchBendEvent, MidiAftertouchEvent, MidiPolyAftertouchEvent, MidiProgramChangeEvent, MidiEffectPlugin, MidiEffectFactory, MidiEffectModule, } from "./types/midi-effect";
export type { InstrumentVoice, InstrumentPlugin, InstrumentFactory, InstrumentModule, } from "./types/instrument";
export type { EqBand, EqBandType, VocalEqSettings, VocalCompressorSettings, VocalDeEsserSettings, VocalSaturationSettings, VocalPitchCorrectionSettings, VocalPopFilterSettings, VocalGateSettings, VocalExciterSettings, VocalFeedbackProtectionSettings, VocalLimiterSettings, VocalChorusSettings, VocalReverbSettings, VocalDelaySettings, VocalPreset, VocalPresetModule, } from "./types/vocal-preset";
export type { UniformType, ShaderUniform, ShaderDefinition, ShaderModule, } from "./types/shader";
export type { CollaborationAccess, LicenseToken, LicenseGranted, LicenseDenied, LicenseCheckResult, LicenseChecker, } from "./types/licensing";
export type { HostToPluginMessage, HostToPluginExtended, PluginToHostEvent, PluginInitMessage, PluginParamsUpdateMessage, PluginProcessMessage, PluginMidiMessage, PluginNoteOnMessage, PluginNoteOffMessage, PluginDisposeMessage, PluginReadyEvent, PluginAudioOutputEvent, PluginMidiOutputEvent, PluginErrorEvent, PluginFetchRequestEvent, PluginFetchResponseMessage, } from "./types/events";
export type { MacroStage, MacroControlMapping, MacroControl, MacroPluginDescriptor, MacroPluginManifest, MacroPluginModule, } from "./types/macro-plugin";
export { applyMacroControl, interpolatePresets, randomizeParams, } from "./types/macro-plugin";
export { noteToHz, hzToNote, hzToNoteFractional, midiToName, nameToMidi, semitonesBetween, transpose, beatsToSeconds, secondsToBeats, gainToDb, dbToGain, clamp, lerp, } from "./helpers/note-utils";
export type { NoteName } from "./helpers/note-utils";
//# sourceMappingURL=index.d.ts.map
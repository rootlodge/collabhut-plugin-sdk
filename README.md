# @collabhut/plugin-sdk

The official SDK for building, publishing, and licensing plugins for [CollabDAW](https://daw.collabhut.com) — the browser-based DAW on the [CollabHut](https://collabhut.com) ecosystem.

## Install

```bash
npm install @collabhut/plugin-sdk
```

## What you get

- **Typed manifests** — `PluginManifest`, `PluginType`, `PluginPricing`, `SemVer`
- **Parameter system** — `RangeParam`, `BoolParam`, `ChoiceParam` with full curve support
- **Audio effects** — `AudioEffectFactory`, `AudioEffectIO`
- **MIDI effects** — typed MIDI event union (`NoteOn`, `NoteOff`, `CC`, `PitchBend`, …)
- **Instruments** — `InstrumentPlugin`, `InstrumentVoice`
- **Vocal presets** — full chain: EQ, compressor, de-esser, saturation, pitch correction, chorus, reverb, delay, pop filter, gate, exciter, limiter
- **UI descriptors** — `PluginUIDescriptor` for building rich device editor layouts
- **Licensing** — `LicenseChecker`, `LicenseToken`, collaboration access control
- **Worker protocol** — typed `HostToPluginMessage` / `PluginToHostEvent` discriminated unions for Web Worker DSP
- **Helpers** — `noteToHz`, `hzToNote`, `gainToDb`, `dbToGain`, `clamp`, MIDI name utilities

## Build

```bash
npm run build   # emits dist/
npm run typecheck
```

The package is a pure TypeScript types-only SDK. DSP logic lives in your plugin Worker — this SDK provides the contracts.

## Links

- CollabHut: [collabhut.com](https://collabhut.com)
- CollabDAW: [daw.collabhut.com](https://daw.collabhut.com)
- Root Lodge (parent): [rootlodge.com](https://rootlodge.com)


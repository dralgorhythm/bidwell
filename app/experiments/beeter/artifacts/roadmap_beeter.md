# Technical Roadmap: Beeter Implementation

**Status:** Ready for Implementation
**Date:** 2025-11-28
**Owner:** Principal Architect & Product Manager

## Overview
This roadmap outlines the phased implementation of **Beeter**, the hybrid web audio workstation. It is designed to be executed by the **Builder Agent**, with checkpoints for verification by the **QA Engineer**.

## Phase 1: The Foundation (Core Audio & Infrastructure)
**Goal:** Establish the "Trinity of Threads" architecture and prove sample-accurate timing.

- [x] **Task 1.1: Repo Initialization**
    -   Initialize Monorepo structure (pnpm workspace).
    -   `apps/web`: React 19 + Vite + TypeScript.
    -   `packages/audio`: Rust 2024 + wasm-bindgen.
    -   **Config:**
        -   Configure `vite-plugin-wasm` and `vite-plugin-top-level-await`.
        -   Set COOP/COEP headers in `vite.config.ts` to enable `SharedArrayBuffer`.
- [x] **Task 1.2: Rust DSP "Hello World"**
    -   Create a simple Rust function that generates a Sine Wave into a buffer.
    -   Compile to Wasm using `wasm-pack` or `vite-plugin-rsw`.
    -   Verify loading in browser.
- [x] **Task 1.3: AudioWorklet Bridge**
    -   Implement `AudioWorkletProcessor` in TypeScript.
    -   Load the Wasm module inside the Worklet.
    -   Implement the `process()` loop to call the Wasm DSP.
- [x] **Task 1.4: SharedArrayBuffer Control**
    -   Create a `SharedArrayBuffer` in the main thread.
    -   Send it to the Worklet via `postMessage`.
    -   Implement `Atomics` to read a "Frequency" value in Rust.
    -   **Verification:** Connect a React Slider to the SAB and hear the pitch change instantly (<10ms latency).

## Phase 2: The Engine (Strudel & Scheduling)
**Goal:** Implement the "Fire-and-Forget" scheduling logic.

- [x] **Task 2.1: Worker Thread Scheduler**
    -   Create a Web Worker for the Scheduler.
    -   Implement the "Lookahead" loop (setInterval, ~25ms).
    -   Port/Import `strudel` core logic.
- [x] **Task 2.2: The "Hap" Bridge**
    -   Define the `Hap` data structure (Time, Note, Param).
    -   Implement messaging from Worker -> Main -> AudioWorklet.
    -   **Optimization:** Ensure Haps are scheduled in the AudioWorklet queue.
- [x] **Task 2.3: Basic Grid Sequencer**
    -   Create a simple 16-step visual grid in React.
    -   **Design:** Use "Garden Bed" aesthetic (Rounded corners, #F0F0F0 background).
    -   Map clicks to a Strudel pattern string (e.g., `s("bd*4")`).
    -   **Verification:** Clicking grid buttons plays sound in time.

## Phase 3: The Interface (UI & Bi-Directional Mapping)
**Goal:** Build the "Hybrid" interface where code and grid are synced.

- [ ] **Task 3.1: Code Editor Integration**
    -   Integrate `CodeMirror` or `Monaco`.
    -   **Style:** "Loam Dark" background (`#2C2424`), `JetBrains Mono` font.
    -   Implement the AST Parser (Peggy/Strudel Parser).
- [ ] **Task 3.2: Bi-Directional Sync**
    -   Implement `Grid -> AST -> Code` transformation.
    -   Implement `Code -> AST -> Grid` transformation.
    -   Handle edge cases (polymeters, complex syntax).
- [ ] **Task 3.3: Visual Feedback**
    -   Implement "Playhead" visualization using `requestAnimationFrame`.
    -   **Style:** "Watering Can" playhead (Stem Green overlay).
    -   Sync playhead to the Scheduler's time.

## Phase 4: Collaboration (The Network)
**Goal:** Enable multi-user sessions.

- [ ] **Task 4.1: Signaling Server**
    -   Deploy a simple Node.js WebSocket server on Railway.
- [ ] **Task 4.2: Yjs Integration**
    -   Replace local state with `Y.Doc`.
    -   Bind the Grid state to `Y.Map`.
    -   Connect via `y-webrtc` (with WebSocket fallback).
- [ ] **Task 4.3: Awareness**
    -   Implement "Remote Cursors" showing which step other users are editing.

## Phase 5: Polish & Optimization
**Goal:** Production readiness.

- [ ] **Task 5.1: DSP Optimization**
    -   Implement Object Pooling for Voices in Rust.
    -   Add Reverb/Delay effects.
- [ ] **Task 5.2: Offline Support**
    -   Configure Vite PWA plugin.
    -   Implement Service Worker caching for samples.
- [ ] **Task 5.3: Mobile "Unlock"**
    -   Add "Enter Studio" overlay to resume AudioContext on iOS.

## Dependencies & Risks
-   **Risk:** `SharedArrayBuffer` headers on GitHub Pages.
    -   *Mitigation:* Use `coi-serviceworker` if headers cannot be set directly, or switch to Netlify/Vercel if needed.
-   **Risk:** Rust/Wasm build times in CI.
    -   *Mitigation:* Cache `target` directory in GitHub Actions.

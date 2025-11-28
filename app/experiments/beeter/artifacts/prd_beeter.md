# Product Requirements Document (PRD): Beeter

**Version:** 1.0
**Status:** Draft
**Date:** 2025-11-28
**Author:** Product Manager Agent

## 1. Executive Summary
**Beeter** is a high-performance, browser-based music production workstation that fuses the tactile immediacy of a classic 16-step "Groove Box" with the infinite depth of algorithmic live coding. By leveraging modern web technologies (WebAssembly, AudioWorklet, SharedArrayBuffer), Beeter eliminates the historical performance gap between native DAWs and web apps, delivering a sample-accurate, zero-latency instrument. It is designed to be "Google Docs for Music"—a collaborative, accessible, and professional-grade platform for the next generation of electronic musicians.

## 2. Problem Statement
*   **The Gap:** Musicians are currently forced to choose between "toys" (web apps with poor timing and limited features) and "silos" (heavy, expensive desktop DAWs that isolate users).
*   **The Friction:** Traditional live coding environments (Tidal Cycles, SuperCollider) require complex setups and command-line knowledge, alienating visual thinkers.
*   **The Latency:** Most web audio apps suffer from jitter and UI-blocking, making them feel "spongy" and unmusical.

## 3. Product Vision
To democratize music creation by providing a **hybrid interface** that teaches code through action. Users can start clicking buttons on a grid (Groove Box mode) and watch the code generate in real-time, or type code to manipulate the grid. This bi-directional mapping bridges the gap between intuition and logic.

## 4. Target Audience
*   **Primary:** Intermediate-to-Advanced Electronic Musicians ("Prosumers") who use hardware groove boxes (Elektron, Akai) but want a portable, collaborative alternative.
*   **Secondary:** Live Coders and Educators who want a zero-setup environment to teach algorithmic music.
*   **Tertiary:** Casual users who want to jam with friends in real-time without installing software.

## 5. Key Features & Requirements (MVP)

### 5.1 Core Audio Engine ("The Heart")
*   **Requirement:** Sample-accurate timing (<3ms jitter).
*   **Implementation Constraint:** Must use **AudioWorklet** for all scheduling and DSP. The main thread must NEVER block audio.
*   **DSP:** Synthesis and Effects must be powered by **Rust compiled to WebAssembly (Wasm)** to ensure performance and stability.
*   **Zero-Latency Control:** UI knobs must communicate with the Audio Engine via **SharedArrayBuffer** to bypass the event loop.

### 5.2 Hybrid User Interface ("The Face")
*   **Bi-Directional Mapping:**
    *   **Grid-to-Code:** Clicking a step on the 16-step grid generates/updates the underlying Strudel/Tidal pattern string.
    *   **Code-to-Grid:** Typing a pattern (e.g., `s("bd(3,8)")`) updates the visual grid to reflect the Euclidean rhythm.
*   **Parameter Locking (P-Locks):** Users must be able to hold a step and turn a knob to apply parameters *only* to that step.
*   **Visual Feedback:** Playheads must be independent per track (Polymeter support).

### 5.3 Collaboration ("The Network")
*   **Real-Time Sync:** Multiple users can edit the same project simultaneously.
*   **Conflict Resolution:** Use **CRDTs (Yjs)** to ensure eventual consistency without locking.
*   **Presence:** Users see "Remote Cursors" indicating where others are working.

### 5.4 Platform & Infrastructure
*   **Offline Capable:** Must function as a **PWA** (Progressive Web App) with offline support via Service Workers.
*   **Asset Management:** Intelligent caching of samples (LRU Cache) to prevent OOM errors on mobile devices.
*   **Mobile Support:** "Unlock Audio" flow for iOS; touch-optimized controls.

## 6. User Stories

### Story 1: The Hybrid Workflow
> **As a** musician,
> **I want** to program a beat on the grid and see the corresponding code appear,
> **So that** I can learn how to manipulate the pattern algorithmically later.

### Story 2: The Jam Session
> **As a** producer,
> **I want** to send a link to a friend and have them add a bassline to my drum loop in real-time,
> **So that** we can collaborate remotely without file transfers.

### Story 3: The Performance
> **As a** live performer,
> **I want** to tweak the filter cutoff knob and hear the result instantly without glitching,
> **So that** I can perform expressively on stage.

## 7. Non-Functional Requirements
*   **Latency:** Audio output latency must be <50ms (system dependent), but *control* latency must be <10ms.
*   **Frame Rate:** UI must maintain 60fps during playback.
*   **Reliability:** Audio must never drop out (glitch) due to UI interaction or garbage collection.
*   **Compatibility:** Must support Chrome, Firefox, and Safari (latest versions).

## 8. Success Metrics
*   **Technical:** Zero reported audio dropouts in 99% of sessions.
*   **Engagement:** Average session duration > 15 minutes.
*   **Adoption:** 20% of users utilize the "Code View" (indicating successful bridging of the UI/Code gap).

## 9. Risks & Dependencies
*   **Browser Support:** SharedArrayBuffer requires specific headers (`Cross-Origin-Opener-Policy`, `Cross-Origin-Embedder-Policy`). This can complicate hosting (e.g., on simple CDNs).
*   **Wasm Complexity:** Debugging Rust/Wasm in the browser is harder than JS.
*   **Mobile Audio:** iOS Safari is notoriously strict with auto-play policies and resource limits.

## 10. Out of Scope (MVP)
*   VST/AU Plugin hosting.
*   Full multi-track audio recording (DAW features).
*   Legacy MIDI hardware support (Web MIDI is Phase 2).

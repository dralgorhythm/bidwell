# Architecture Decision Record (ADR): Beeter System Architecture

**Status:** Proposed
**Date:** 2025-11-28
**Author:** Principal Architect

## 1. Context and Problem Statement

We are building "Beeter," a high-performance web-based groove box and live coding environment. The system requires:
-   **Sample-accurate timing** (<3ms jitter).
-   **Zero-latency UI control** (<10ms).
-   **Real-time collaboration** (Google Docs style).
-   **Offline capability** (PWA).

The challenge is to achieve native-level audio performance within the browser's constraints (single-threaded JS event loop, garbage collection pauses) while adhering to the organization's **2025 Tech Strategy**.

## 2. Decision Drivers

-   **Performance**: Audio must never glitch.
-   **Latency**: Control-to-sound latency must be imperceptible.
-   **Scalability**: Must support multi-user collaboration.
-   **Maintainability**: Strict separation of concerns between UI and Audio.
-   **Compliance**: Must use approved "Golden Path" technologies (React, Rust, Vite).

## 3. High-Level Architecture

The system adopts a **"Trinity of Threads"** architecture to isolate responsibilities and guarantee performance.

```mermaid
graph TD
    subgraph "Main Thread (UI & Logic)"
        UI[React 19 UI]
        Store[Zustand Store]
        Yjs[Yjs CRDT Doc]
        WorkerBridge[Worker Bridge]
    end

    subgraph "Web Worker (Scheduling)"
        Scheduler[Strudel Scheduler]
        AST[Pattern Parser]
    end

    subgraph "Audio Thread (DSP)"
        Worklet[AudioWorklet]
        Wasm[Rust Wasm DSP]
    end

    subgraph "Network"
        SigServer[Signaling Server (Railway)]
        Peers[Peer Clients]
    end

    UI -->|Updates| Store
    Store -->|Syncs| Yjs
    Yjs <-->|WebRTC| Peers
    Yjs <-->|WebSocket| SigServer

    Store -->|PostMessage| Scheduler
    Scheduler -->|Lookahead Events| Worklet
    
    UI -->|SharedArrayBuffer (Control)| Worklet
    Worklet -->|Audio Stream| Speakers
```

## 4. Component Design

### 4.1 Frontend (The "Face")
*   **Technology**: React 19, TypeScript, Vite.
*   **State Management**: **Zustand**.
    *   *Rationale*: Zustand allows for transient state updates (knob twists) to bypass React renders via direct subscriptions, essential for 60fps performance.
*   **Collaboration**: **Yjs** (CRDT).
    *   *Rationale*: Industry standard for conflict-free text and data editing.
*   **Styling**: Vanilla CSS (CSS Modules) as per Tech Strategy.

### 4.2 The Bridge (The "Nervous System")
*   **SharedArrayBuffer (SAB)**:
    *   Used for **Control Signals** (Cutoff, Resonance, Volume).
    *   UI writes to SAB; Audio Thread reads from SAB using `Atomics`.
    *   *Trade-off*: Requires `Cross-Origin-Opener-Policy` (COOP) and `Cross-Origin-Embedder-Policy` (COEP) headers, restricting embedding capabilities but enabling high performance.
*   **Ring Buffers**: Used for passing high-frequency event streams if SAB is unavailable (fallback) or for non-atomic data.

### 4.3 Audio Engine (The "Heart")
*   **Technology**: **Rust 2024** compiled to **WebAssembly**.
*   **Runtime**: **AudioWorklet**.
*   **DSP Architecture**:
    *   **Voices**: Pre-allocated object pool of voices (Oscillators, Envelopes) to prevent GC pauses.
    *   **Mixing**: Rust-based mixer with insert effects.
    *   **Synthesis**: Wavetable and Subtractive synthesis implemented in Rust.
*   **Why Rust?**:
    *   No Garbage Collection (predictable performance).
    *   SIMD support for fast DSP.
    *   Memory safety.

### 4.4 Backend (The "Coordinator")
*   **Technology**: **Node.js LTS** (Production) / **Bun** (Dev).
*   **Role**: Lightweight Signaling Server for WebRTC (Y-WebRTC).
*   **Hosting**: **Railway** (Agile Tier).
*   **Persistence**: **Postgres** (via Railway) for saving project metadata and user profiles.

## 5. Data Flow

1.  **User Interaction**: User twists "Filter" knob.
2.  **UI Update**: React component updates visually (optimistic).
3.  **State Update**: Zustand store updates `filterValue`.
4.  **Control Signal**: `filterValue` is written to `SharedArrayBuffer` index `0`.
5.  **Audio Render**:
    *   AudioWorklet wakes up (every ~2.9ms).
    *   Rust Wasm reads `SharedArrayBuffer[0]`.
    *   DSP algorithm applies new filter coefficient immediately.
6.  **Network Sync**:
    *   Yjs observes change.
    *   Propagates delta to connected peers via WebRTC.

## 6. Deployment Strategy

*   **Frontend**: Deployed to **GitHub Pages** (Static Tier).
    *   *Config*: Must configure HTTP headers for COOP/COEP.
*   **Backend**: Deployed to **Railway** (Agile Tier).
    *   *Service*: Node.js WebSocket server.

## 7. Compliance Checklist

- [x] **Language**: TypeScript (UI), Rust (Audio).
- [x] **Framework**: React 19.
- [x] **Build**: Vite.
- [x] **Hosting**: GitHub Pages + Railway.
- [x] **Observability**: OpenTelemetry (to be added to Backend).

## 8. Risks and Mitigations

| Risk | Mitigation |
| :--- | :--- |
| **Wasm Bundle Size** | Use `wasm-opt` and lazy loading for DSP modules. |
| **Browser Compatibility** | Graceful fallback for browsers without SAB (higher latency). |
| **Mobile Audio** | "Unlock" screen to handle iOS auto-play policy. |
| **Complexity** | Strict type sharing between Rust (wasm-bindgen) and TS. |

## 9. Next Steps

1.  **Initialize Repo**: Set up Monorepo with `apps/web` (Vite) and `packages/audio` (Rust).
2.  **Proof of Concept**: Build a simple "Sine Wave" controlled by a React Slider using the SAB bridge.
3.  **Benchmark**: Measure round-trip latency.

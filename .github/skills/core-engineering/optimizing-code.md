---
name: optimizing-code
description: The specific discipline of improving machine efficiency (time/space) without altering external behavior.
---

# Optimizing Code (Polyglot)

## The Science of Optimization
Optimization is engineering for the machine. It often trades readability for performance. **You must wear the "Optimization Hat" and providing benchmarks is mandatory.**

## Architectural Models
### 1. The Roofline Model
Determine if your code is **Compute-Bound** or **Memory-Bound**.
*   **Arithmetic Intensity (AI)**: `FLOPs / Bytes Transferred`.
*   **Memory-Bound**: AI is low. Optimizing CPU instructions (AVX) is useless. Optimize memory access (tiling, pre-fetching).
*   **Compute-Bound**: AI is high. Optimize CPU instructions.

### 2. Cache Locality
Data access patterns dominate modern performance.
*   **Spatial Locality**: Access arrays sequentially. Linked Lists cause cache misses.
*   **Data-Oriented Design (DOD)**: Use "Structure of Arrays" over "Array of Structures" to maximize cache line utilization for hot loops.

### 3. Big O Notation
*   **O(1)**: Hash Maps (Latency specific).
*   **O(n log n)**: Sorting.
*   **O(n^2)**: Nested loops. Avoid for N > 1000.

## Workflows

- [ ] **Phase 1: Profiling**
    - [ ] Establish a baseline measurement (Latency/Throughput).
    - [ ] Use a profiler (perf, pprof, VisualVM) to identify "Hot Paths".
    - [ ] **STOP**: Do not optimize code that is not on the hot path.

- [ ] **Phase 2: Algorithmic Improvement**
    - [ ] Can O(n^2) become O(n log n)?
    - [ ] Can we use a Hash Map for O(1) lookup?

- [ ] **Phase 3: Hardware Sympathy**
    - [ ] Batch I/O operations to amortize overhead.
    - [ ] Use contiguous memory (Arrays/Vectors) to hit L1/L2 cache.
    - [ ] Use SIMD/Vectorization where applicable.

- [ ] **Phase 4: Verification**
    - [ ] Run Regression Tests (Must pass - behavior cannot change).
    - [ ] Run Benchmarks (Must show statistically significant improvement).

## Tools
*   **Python**: `cProfile`, `py-spy`.
*   **Go**: `pprof`.
*   **Rust**: `criterion`, `flamegraph`.
*   **Node**: `0x`, Chrome DevTools.

## Reference Implementation (Data Oriented Design)

```cpp
// Bad (OOP - Array of Structs): Poor Cache Locality
struct Particle { float x, y; int hp; };
vector<Particle> particles;
// Updating 'x' loads 'y' and 'hp' into cache unnecessarily.

// Good (DOD - Struct of Arrays): Perfect Cache Locality
struct ParticleSystem {
    vector<float> xs;
    vector<float> ys;
    vector<int> hps;
};
// Updating 'xs' loads ONLY 'xs' into cache.
```

## Resources
- [Refactoring and Clean Code](../../instructions/core-engineering/refactoring-clean-code.md)

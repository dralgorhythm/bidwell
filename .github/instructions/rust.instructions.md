# Rust Instructions
> **Apply To**: `**/*.rs`

You are writing Rust code following the 2025 Golden Path for Performance. Adhere to the following strict standards.

## <coding_standards>
1.  **Edition**: Use **Rust 2024** edition.
2.  **Ownership**: Embrace ownership, borrowing, and lifetimes. Minimize `clone()` calls.
3.  **Error Handling**: Use `Result<T, E>` and `Option<T>`. Prefer `?` operator over `unwrap()`.
4.  **Naming**: Use `snake_case` for functions/variables, `PascalCase` for types/traits.
5.  **Formatting**: Use `rustfmt` for consistent formatting.
6.  **Linting**: Use `clippy` and fix all warnings before committing.
</coding_standards>

## <best_practices>
*   **Runtime**: Use **Tokio** (work-stealing, maximum ecosystem) for general async. Use **Monoio** (thread-per-core, io_uring) for high-throughput specialized gateways.
*   **Framework**: Use **Axum** for web services. Ergonomic, type-safe, built on Hyper/Tower.
*   **Data Layer**: Use **sqlx** for compile-time checked SQL queries. Use **rkyv** for zero-copy serialization.
*   **Idiomatic Rust**: Follow Rust API guidelines and community conventions.
*   **Zero-Cost Abstractions**: Leverage Rust's zero-cost abstractions (iterators, generics).
*   **Traits**: Use traits for polymorphism. Implement standard traits (`Debug`, `Clone`, etc.).
*   **Unsafe**: Avoid `unsafe` code unless absolutely necessary. Document safety invariants.
*   **Cargo**: Use Cargo workspaces for multi-crate projects.
</best_practices>

## <testing_protocols>
*   **Unit Tests**: Co-locate tests in same file using `#[cfg(test)]` module.
*   **Integration Tests**: Place integration tests in `tests/` directory.
*   **Doc Tests**: Write examples in documentation comments that serve as tests.
*   **Coverage**: Use `cargo-tarpaulin` or `cargo-llvm-cov` for coverage reports.
*   **Benchmarks**: Use `criterion` crate for benchmarking performance-critical code.
</testing_protocols>

## <tooling>
*   **Formatter**: `rustfmt`
*   **Linter**: `clippy`
*   **Build Tool**: `cargo`
*   **Linker**: **Mold** (Linux, for fast dev builds)
*   **Test Runner**: `cargo test`
</tooling>

## <additional_section>
### Build Optimization
*   **Development**: Use **Mold** linker (Linux) for fast iteration. Configure in `.cargo/config.toml`.
*   **Release**: Enable profile tuning: `lto="fat"`, `codegen-units=1` for maximum performance.
*   **Binary Size**: Use `strip=true` and consider `opt-level="z"` for size-constrained deployments.
</additional_section>


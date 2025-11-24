---
name: Writing Rust
description: Writing safe, concurrent, and performant Rust code leveraging ownership, zero-cost abstractions, and the rich Cargo ecosystem.
---

# Writing Rust

## Workflows

### 1. Scaffold Rust Project

Creates a new Rust project with Cargo.

```bash
#!/bin/bash
# create-rust-project.sh
# Usage: ./create-rust-project.sh <project-name> <type>
# type: bin (binary) or lib (library)

PROJECT_NAME=$1
PROJECT_TYPE=${2:-bin}

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 <project-name> [bin|lib]"
  exit 1
fi

if [ "$PROJECT_TYPE" = "lib" ]; then
  cargo new --lib "$PROJECT_NAME"
else
  cargo new "$PROJECT_NAME"
fi

cd "$PROJECT_NAME"

# Add common dev dependencies
cargo add tokio --features full
cargo add axum
cargo add sqlx --features postgres,runtime-tokio
cargo add serde --features derive
cargo add anyhow thiserror

# Create clippy config
cat <<EOF > clippy.toml
# Enable all clippy lints by default
warn-on-all-wildcard-imports = true
EOF

# Update Cargo.toml with best practices
cat <<EOF >> Cargo.toml

# Mold linker for fast dev builds (Linux only)
[target.x86_64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=-fuse-ld=mold"]

[profile.release]
lto = true
codegen-units = 1
strip = true
EOF

echo "Rust project created: $PROJECT_NAME ($PROJECT_TYPE)"
echo "Run 'cargo build' to compile, 'cargo test' to run tests"
```

## Feedback Loops

### 1. Linting (Clippy)

* **Trigger**: On save or Pre-commit.
* **Action**: Run `cargo clippy -- -D warnings`.
* **Outcome**: Catch common mistakes and enforce idiomatic Rust code.

### 2. Testing

* **Trigger**: Pre-commit or CI.
* **Action**: Run `cargo test`.
* **Outcome**: Verify correctness of logic and concurrency safety.

### 3. Formatting

* **Trigger**: On save.
* **Action**: Run `cargo fmt`.

## Resources
<!-- Links to external docs or local reference files -->
- [Rust Instructions](../../instructions/rust.instructions.md)


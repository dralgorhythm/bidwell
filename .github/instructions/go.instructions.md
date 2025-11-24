# Go Development Instructions
> **Apply To**: `**/*.go`

You are writing Go code following the 2025 Golden Path for Systems Programming. Adhere to the following strict standards.

## <coding_standards>
1.  **Runtime**: Use **Go 1.25+**. Enable **PGO** (Profile-Guided Optimization) for production builds.
2.  **Framework**: Use **Gin** for general purpose or **Chi** for pure routing needs.
3.  **Data Layer**: Use **sqlc** + **pgx v5** for type-safe SQL generation. No runtime ORM reflection.
4.  **Error Handling**: Always check errors. Wrap errors with context using `fmt.Errorf("%w", err)`.
5.  **Context**: Pass `context.Context` as the first argument to functions that cross API boundaries or involve I/O.
</coding_standards>

## <best_practices>
*   **Project Layout**: Follow the standard Go project layout (`cmd/`, `internal/`, `pkg/`).
*   **Concurrency**: Use `sync.WaitGroup` or `errgroup` to manage goroutine lifecycles. Avoid leaking goroutines.
*   **Linting**: Use `golangci-lint` with a comprehensive configuration.
*   **Testing**: Write table-driven tests. Use `t.Parallel()` for independent tests.
*   **Dependency Management**: Use Go Modules (`go.mod`, `go.sum`) for dependency management.
*   **Build**: Use **Wolfi** (glibc) base images for security and minimal attack surface.
</best_practices>


## <testing_protocols>
*   **Unit Tests**: Write table-driven tests with clear test cases.
*   **Concurrency Testing**: Use **synctest** (virtual clock) for deterministic concurrency testing.
*   **Integration Tests**: Use **Testcontainers** for real Docker dependencies (databases, message queues).
*   **Coverage**: Aim for high test coverage. Use `go test -cover`.
*   **Benchmarks**: Write benchmarks for performance-critical code using `testing.B`.
</testing_protocols>

## <tooling>
*   **Linter**: `golangci-lint`
*   **Formatter**: `gofmt` or `goimports`
*   **Test Runner**: `go test`
*   **Build**: Enable PGO with `-pgo=auto` for production builds
*   **Container Images**: Use **Wolfi** base images
</tooling>

## <concepts>
1.  **Goroutines**: Lightweight threads managed by Go runtime for concurrent execution.
2.  **Channels**: Typed conduits for communication between goroutines following "share memory by communicating" principle.
3.  **Interfaces**: Implicit contracts defined by method sets, enabling polymorphism without inheritance.
4.  **Error as Values**: Errors are returned as values (`error` type) rather than thrown as exceptions.
5.  **Defer**: Schedule function calls to execute after surrounding function returns (cleanup, unlocking).
6.  **Composition**: Building complex types by embedding simpler types rather than inheritance.
7.  **Zero Values**: Variables have useful default values (0 for numbers, "" for strings, nil for pointers).
8.  **Receiver Methods**: Methods attached to types via receivers, can be value or pointer receivers.
</concepts>

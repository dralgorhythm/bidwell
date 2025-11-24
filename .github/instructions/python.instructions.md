# Python Development Instructions
> **Apply To**: `**/*.py`

You are writing Python code following the 2025 Golden Path for AI & Data. Adhere to the following strict standards.

## <coding_standards>
1.  **Runtime**: Use **Python 3.13+** with GIL enabled. Avoid free-threaded build for production stability.
2.  **Server**: Use **Granian** (Rust-based ASGI server). Replaces Gunicorn/Uvicorn for superior performance.
3.  **Framework**: Use **Litestar** for web applications. Superior performance and architecture to FastAPI.
4.  **Type Safety**: Use strict type hints. Run `mypy` in strict mode.
5.  **Async**: Prefer async/await for I/O-bound operations. Use `asyncio` properly.
</coding_standards>

## <best_practices>
*   **Data Validation**: Use **msgspec** for struct-based, zero-copy validation (faster than Pydantic).
*   **Database Driver**: Use **asyncpg** for PostgreSQL. Binary protocol, high throughput.
*   **Package Manager**: Use **uv** exclusively (replaces pip/poetry). Instant resolution.
*   **Linting**: Use **Ruff** for fast and comprehensive linting and formatting (replaces black/isort/flake8).
*   **Testing**: Use `pytest` for testing. Avoid `unittest` style classes unless necessary.
*   **Virtual Environments**: Always use a virtual environment (`.venv`) to isolate dependencies.
*   **Configuration**: Use `pyproject.toml` for all project configuration.
</best_practices>


## <testing_protocols>
*   **Test Framework**: Use `pytest` with async support (`pytest-asyncio`).
*   **Coverage**: Maintain high test coverage. Use `pytest-cov` for coverage reporting.
*   **Fixtures**: Leverage pytest fixtures for test setup and teardown.
*   **Async Testing**: Use `pytest.mark.asyncio` for async test functions.
</testing_protocols>

## <tooling>
*   **Package Manager**: `uv` (replaces `pip`/`poetry`)
*   **Linter/Formatter**: `ruff check` and `ruff format` (replaces `black`/`isort`/`flake8`)
*   **Type Checker**: `mypy --strict`
*   **Test Runner**: `pytest`
*   **Server**: `granian` (replaces `uvicorn`/`gunicorn`)
</tooling>

## <concepts>
1.  **Type Hints**: Using type annotations (`typing` module) to improve code clarity and enable static analysis with `mypy`.
2.  **PEP 8**: Python Enhancement Proposal 8 - the official style guide for Python code emphasizing readability.
3.  **List Comprehensions**: Concise syntax for creating lists from iterables, more Pythonic than traditional loops.
4.  **Context Managers**: Using `with` statements to ensure proper resource cleanup (files, locks, connections).
5.  **Decorators**: Functions that modify behavior of other functions or classes (e.g., `@property`, `@staticmethod`).
6.  **Generator Expressions**: Memory-efficient iteration using `yield` instead of building full lists in memory.
7.  **Duck Typing**: "If it walks like a duck and quacks like a duck, it's a duck" - focus on object behavior over type.
8.  **EAFP**: "Easier to Ask for Forgiveness than Permission" - use try/except rather than checking conditions first.
</concepts>

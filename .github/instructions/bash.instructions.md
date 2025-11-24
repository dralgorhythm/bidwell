# Bash Scripting Instructions
> **Apply To**: `**/*.sh`, `**/*.bash`

Guidelines for writing secure, maintainable Bash scripts following best practices.

## <coding_standards>
1.  **Shebang**: Always use `#!/usr/bin/env bash` for portability.
2.  **Strict Mode**: `set -euo pipefail` - exit on error, undefined variables, and pipe failures.
3.  **Variable Naming**: Use `UPPER_CASE` for exported/global variables, `lower_case` for local variables.
4.  **Local Variables**: Always declare variables as `local` inside functions to avoid polluting the global scope.
5.  **Quoting**: Double quotes `"$var"` for variable expansion, single quotes `'literal'` for literals.
</coding_standards>

## <best_practices>
*   **Error Handling**: Check for command existence (`command -v`) and file existence before operations.
*   **Comments**: Document complex logic and regex patterns.
*   **Idempotency**: Scripts should be safe to run multiple times without side effects.
*   **Subshells**: `$(command)` captures command output, runs in subshell (preferred over backticks).
*   **Test Conditions**: `[[ ]]` for tests (preferred over `[ ]` for portability and features).
</best_practices>

## <testing_protocols>
*   **Linting**: Run `shellcheck` on every commit.
*   **Unit Testing**: Use `bats` (Bash Automated Testing System) for unit testing scripts.
</testing_protocols>

## <tooling>
*   **Linter**: `shellcheck`
*   **Test Runner**: `bats`
</tooling>

## <concepts>
1.  **Exit Codes**: Commands return 0 for success, non-zero for failure. Use `$?` to check last exit code.
2.  **Process Substitution**: `<(command)` treats command output as a file for reading.
3.  **Here Documents**: `<<EOF` for multi-line strings or command input.
4.  **Traps**: `trap` for cleanup on script exit, error, or interrupt signals.
</concepts>


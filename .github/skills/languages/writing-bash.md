---
name: Writing Bash
description: Writing robust, maintainable shell scripts for automation, system administration, and DevOps tasks.
---

# Writing Bash

## Workflows

### 1. Scaffold Bash Script

Standard template with best practices for robust scripts.

```bash
#!/usr/bin/env bash
# script-template.sh
# Description: [What this script does]
# Usage: ./script-template.sh [arguments]

set -euo pipefail  # Exit on error, undefined vars, pipe failures
IFS=$'\n\t'        # Set safe Internal Field Separator

# Script directory (useful for relative paths)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_DIR

# Color codes for output (optional)
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m' # No Color

# Cleanup function (called on exit)
cleanup() {
  local exit_code=$?
  # Perform cleanup here (remove temp files, etc.)
  exit "$exit_code"
}
trap cleanup EXIT INT TERM

# Logging functions
log_info() {
  echo -e "${GREEN}[INFO]${NC} $*" >&2
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $*" >&2
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $*" >&2
}

# Usage function
usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Description of what this script does.

OPTIONS:
  -h, --help       Show this help message
  -v, --verbose    Enable verbose output
  -f, --file FILE  Specify input file

EXAMPLES:
  $(basename "$0") --file input.txt
EOF
}

# Parse arguments
parse_args() {
  while [[ $# -gt 0 ]]; do
    case $1 in
      -h|--help)
        usage
        exit 0
        ;;
      -v|--verbose)
        VERBOSE=true
        shift
        ;;
      -f|--file)
        INPUT_FILE="$2"
        shift 2
        ;;
      *)
        log_error "Unknown option: $1"
        usage
        exit 1
        ;;
    esac
  done
}

# Main logic
main() {
  parse_args "$@"
  log_info "Script started"
  # Your code here
}

main "$@"
```

### 2. Bash Code Review

Review shell scripts for common pitfalls.

1. **Strict Mode Check**: Is `set -euo pipefail` used?
2. **Quoting Check**: Are all variables quoted?
3. **Test Check**: Is `[[ ]]` used instead of `[ ]`?
4. **Local Check**: Are variables in functions declared `local`?
5. **Shellcheck**: Has the script been linted with `shellcheck`?

## Feedback Loops

### 1. Shellcheck Linting

* **Trigger**: Pre-commit hook or CI pipeline.
* **Action**: Run `shellcheck` on all `.sh` files.
* **Outcome**: Fix warnings and errors to ensure script quality.

### 2. Dry Run Verification

* **Trigger**: Before executing destructive operations.
* **Action**: Implement a `--dry-run` flag to print commands instead of executing them.

## Resources
<!-- Links to external docs or local reference files -->
- [Bash Instructions](../../instructions/bash.instructions.md)


---
name: Writing Python
description: Writing clean, maintainable, and performant Python code following modern best practices and type safety.
---

# Writing Python

## Workflows

### 1. Scaffold Python Project

Creates a standard Python project using uv with src layout and testing.

```bash
#!/bin/bash
# create-python-project.sh
# Usage: ./create-python-project.sh <ProjectName> [type]
# Type: lib (default), service

PROJECT_NAME=$1
TYPE=${2:-lib}

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 <ProjectName> [type]"
  exit 1
fi

# Use uv to initialize the project
uv init "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create src layout
mkdir -p "src/$PROJECT_NAME"
mkdir -p "tests"

# Base dependencies
DEPENDENCIES='[]'

if [ "$TYPE" = "service" ]; then
  # Add Litestar, Granian, msgspec, asyncpg for services
  DEPENDENCIES='["litestar", "granian", "msgspec", "asyncpg"]'
fi

# Create pyproject.toml
cat <<EOF > pyproject.toml
[project]
name = "$PROJECT_NAME"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = $DEPENDENCIES

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = ["src"]

[tool.ruff]
line-length = 100
target-version = "py313"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP"]

[tool.mypy]
python_version = "3.13"
strict = true
EOF

# Create initial files
if [ "$TYPE" = "service" ]; then
    # Create basic Litestar app
    cat <<EOF > src/$PROJECT_NAME/app.py
from litestar import Litestar, get

@get("/")
async def hello_world() -> dict[str, str]:
    return {"hello": "world"}

app = Litestar(route_handlers=[hello_world])
EOF
    echo "Created Litestar app in src/$PROJECT_NAME/app.py"
else
    touch "src/$PROJECT_NAME/__init__.py"
fi

touch "tests/__init__.py"
echo "# $PROJECT_NAME" > README.md

echo "Project structure created for: $PROJECT_NAME ($TYPE)"
echo "Using: uv (package manager), Ruff (linter/formatter), Python 3.13+"
if [ "$TYPE" = "service" ]; then
    echo "Stack: Litestar + Granian + msgspec + asyncpg"
    echo "Run: granian --interface asgi src.$PROJECT_NAME.app:app"
fi
```

### 2. Python Code Review

Review Python code for Pythonic idioms and type safety.

1. **Type Check**: Are type hints used consistently?
2. **Style Check**: Does the code follow PEP 8 (via Ruff)?
3. **Complexity Check**: Are list comprehensions used appropriately (not too complex)?
4. **Resource Check**: Are context managers (`with`) used for resources?
5. **Test Check**: Are tests written using `pytest` fixtures?

## Feedback Loops

### 1. Type Checking

* **Trigger**: Pre-commit or CI.
* **Action**: Run `mypy --strict` to enforce type safety.
* **Outcome**: Catch type-related bugs early.

### 2. Linting & Formatting

* **Trigger**: On save or Pre-commit.
* **Action**: Run `ruff check --fix` and `ruff format`.
* **Outcome**: Consistent code style and automatic fix of common issues (replaces black/isort/flake8).

### 3. Testing

* **Trigger**: Pre-commit or CI.
* **Action**: Run `pytest` with coverage.

## Resources
<!-- Links to external docs or local reference files -->
- [Python Instructions](../../instructions/python.instructions.md)



---
name: Writing Go
description: Writing efficient, idiomatic Go code with proper concurrency patterns and error handling.
---

# Writing Go

## Workflows

### 1. Scaffold Go Module

Creates a standard Go module with common structure.

```bash
#!/bin/bash
# create-go-module.sh
# Usage: ./create-go-module.sh <module-name> [framework]
# Framework: gin, chi, none (default)

MODULE_NAME=$1
FRAMEWORK=${2:-none}

if [ -z "$MODULE_NAME" ]; then
  echo "Usage: $0 <module-name> [framework]"
  exit 1
fi

mkdir -p "$MODULE_NAME"
cd "$MODULE_NAME"

# Initialize module
go mod init "$MODULE_NAME"

# Create directory structure
mkdir -p cmd/server
mkdir -p internal/handlers
mkdir -p pkg
mkdir -p test

# Create main.go based on framework
if [ "$FRAMEWORK" = "gin" ]; then
    go get -u github.com/gin-gonic/gin
    cat <<EOF > cmd/server/main.go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    r.Run() // listen and serve on 0.0.0.0:8080
}
EOF
elif [ "$FRAMEWORK" = "chi" ]; then
    go get -u github.com/go-chi/chi/v5
    cat <<EOF > cmd/server/main.go
package main

import (
    "net/http"
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

func main() {
    r := chi.NewRouter()
    r.Use(middleware.Logger)
    r.Get("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("welcome"))
    })
    http.ListenAndServe(":3000", r)
}
EOF
else
    cat <<EOF > cmd/server/main.go
package main

import (
    "fmt"
    "log"
)

func main() {
    fmt.Println("Starting $MODULE_NAME")
    if err := run(); err != nil {
        log.Fatal(err)
    }
}

func run() error {
    return nil
}
EOF
fi

# Create Makefile with PGO support
cat <<EOF > Makefile
.PHONY: build test lint run pgo-build sqlc

# Standard build
build:
	go build -o bin/server ./cmd/server

# Profile-Guided Optimization build
pgo-build:
	go build -pgo=auto -o bin/server-pgo ./cmd/server

test:
	go test -v -race -cover ./...

lint:
	golangci-lint run

sqlc:
	sqlc generate

run:
	go run ./cmd/server
EOF

# Initialize sqlc
cat <<EOF > sqlc.yaml
version: "2"
sql:
  - engine: "postgresql"
    queries: "internal/db/queries"
    schema: "internal/db/schema.sql"
    gen:
      go:
        package: "db"
        out: "internal/db"
        sql_package: "pgx/v5"
EOF

# Create Dockerfile with Wolfi
cat <<EOF > Dockerfile
FROM cgr.dev/chainguard/go:latest as builder
WORKDIR /app
COPY . .
RUN go build -o /app/server ./cmd/server

FROM cgr.dev/chainguard/wolfi-base:latest
WORKDIR /app
COPY --from=builder /app/server /app/server
CMD ["/app/server"]
EOF

echo "Go module structure created: $MODULE_NAME"
echo "Framework: $FRAMEWORK"
echo "Added: sqlc (Type-safe SQL), Wolfi (Secure Base Image)"
```

### 2. Go Code Review

Review Go code for idiomatic usage and correctness.

1. **Error Check**: Are all errors checked and handled?
2. **Context Check**: Is `context.Context` propagated correctly?
3. **Concurrency Check**: Are goroutines managed to prevent leaks?
4. **Resource Check**: Are resources (files, connections) closed using `defer`?
5. **Lint Check**: Does the code pass `golangci-lint`?
6. **Testing Check**: Are concurrency tests using `synctest`? Are integration tests using `Testcontainers`?
7. **Build Check**: Are production builds using PGO and Wolfi base images?

## Feedback Loops

### 1. Automated Linting

* **Trigger**: Pre-commit or CI.
* **Action**: Run `golangci-lint` to catch style and correctness issues.
* **Outcome**: Consistent code style and fewer bugs.

### 2. Race Detection

* **Trigger**: CI Test Suite.
* **Action**: Run tests with the race detector enabled (`go test -race`).

## Resources
<!-- Links to external docs or local reference files -->
- [Go Instructions](../../instructions/go.instructions.md)


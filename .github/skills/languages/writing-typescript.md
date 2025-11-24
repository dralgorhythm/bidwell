---
name: Writing TypeScript
description: Writing type-safe, maintainable TypeScript code with modern language features, strict typing, and integration with popular frameworks.
---

# Writing TypeScript

## Workflows

### 1. Scaffold TypeScript Node Project

Creates a TypeScript Node.js project with modern tooling (pnpm, Biome, Vite).

```bash
#!/bin/bash
# create-ts-node-project.sh
# Usage: ./create-ts-node-project.sh <project-name>

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

mkdir -p "$PROJECT_NAME/src"
cd "$PROJECT_NAME"

# Initialize with pnpm
pnpm init

# Install TypeScript and tools
pnpm add -D typescript @types/node tsx
pnpm add -D @biomejs/biome vitest

# Create tsconfig.json
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create biome.json
cat <<EOF > biome.json
{
  "\$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
EOF

# Create initial source file
cat <<EOF > src/index.ts
function main(): void {
  console.log('Hello from TypeScript!');
}

main();
EOF

# Update package.json scripts
pnpm pkg set scripts.dev="tsx watch src/index.ts"
pnpm pkg set scripts.build="tsc"
pnpm pkg set scripts.start="node dist/index.js"
pnpm pkg set scripts.check="biome check --write src"
pnpm pkg set scripts.format="biome format --write src"
pnpm pkg set scripts.test="vitest"

echo "TypeScript Node.js project created: $PROJECT_NAME"
echo "Using: pnpm, Biome, tsx, Vitest"
```

### 2. Scaffold Frontend App

Creates a modern frontend application based on the Tech Strategy (React 19 / Nuxt 4 / Next.js).

```bash
#!/bin/bash
# create-frontend-app.sh
# Usage: ./create-frontend-app.sh <project-name> <framework>
# Frameworks: react, next, nuxt

PROJECT_NAME=$1
FRAMEWORK=$2

if [ -z "$PROJECT_NAME" ] || [ -z "$FRAMEWORK" ]; then
  echo "Usage: $0 <project-name> <framework>"
  echo "Frameworks: react, next, nuxt"
  exit 1
fi

case $FRAMEWORK in
  react)
    # React 19 + Vite + SWC
    pnpm create vite "$PROJECT_NAME" --template react-swc-ts
    cd "$PROJECT_NAME"
    pnpm install
    # Add Biome
    pnpm add -D @biomejs/biome
    pnpm pkg set scripts.check="biome check --write src"
    ;;
  next)
    # Next.js (Locked to Turbopack as per strategy)
    pnpm create next-app "$PROJECT_NAME" --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --no-git
    cd "$PROJECT_NAME"
    # Note: Next.js uses ESLint by default, but we can add Biome for formatting
    pnpm add -D @biomejs/biome
    ;;
  nuxt)
    # Nuxt 4
    pnpm dlx nuxi@latest init "$PROJECT_NAME" --packageManager pnpm
    cd "$PROJECT_NAME"
    ;;
  *)
    echo "Unknown framework: $FRAMEWORK"
    exit 1
    ;;
esac

echo "Frontend project created: $PROJECT_NAME ($FRAMEWORK)"
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  pnpm dev"
```

## Feedback Loops

### 1. Type Checking

* **Trigger**: On save or Pre-commit.
* **Action**: Run `tsc --noEmit`.
* **Outcome**: Catch type errors early.

### 2. Linting & Formatting

* **Trigger**: On save or Pre-commit.
* **Action**: Run `biome check --write src`.
* **Outcome**: Instant linting and formatting with Biome (replaces ESLint + Prettier).

### 3. Testing

* **Trigger**: Pre-commit or CI.
* **Action**: Run `vitest` for unit and integration tests.

## Resources
<!-- Links to external docs or local reference files -->
- [TypeScript Instructions](../../instructions/typescript.instructions.md)



---
name: Writing Technical Documentation
description: Creating and maintaining clear, concise, and up-to-date documentation (READMEs, Wikis, API docs).
---

# Writing Technical Documentation

## Workflows

### 1. Scaffold Project README

Generate a standard README structure for a new project.

```bash
#!/bin/bash
# scaffold-readme.sh
# Usage: ./scaffold-readme.sh <ProjectName>

PROJECT_NAME=$1
FILENAME="README.md"

cat <<EOF > "$FILENAME"
# $PROJECT_NAME

[Short Description]

## Features
*   Feature 1
*   Feature 2

## Getting Started

### Prerequisites
*   Node.js >= 18
*   Docker

### Installation
\`\`\`bash
npm install
\`\`\`

### Usage
\`\`\`bash
npm start
\`\`\`

## Configuration
| Variable | Description | Default |
| :--- | :--- | :--- |
| PORT | Server Port | 3000 |

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
MIT
EOF

echo "Created README template: $FILENAME"
```

### 2. Documentation Review

Review existing documentation for quality and accuracy.

1. **Audience Check**: Is the target audience clear?
2. **Clarity Check**: Is the language simple and free of jargon?
3. **Accuracy Check**: Do the code examples actually work?
4. **Completeness Check**: Are all required configuration options listed?
5. **Link Check**: Are there any broken links?

## Feedback Loops

### 1. Documentation Testing

* **Trigger**: New documentation or updates to existing docs.
* **Action**: Follow the instructions exactly as written in a clean environment.
* **Outcome**: Identify missing steps, unclear instructions, or broken code examples.

### 2. User Feedback

* **Trigger**: User questions or support tickets related to documentation.
* **Action**: Update documentation to clarify confusing sections or add missing information.

## Resources
<!-- Links to external docs or local reference files -->
- [Technical Documentation Instructions](../../instructions/technical-documentation.instructions.md)


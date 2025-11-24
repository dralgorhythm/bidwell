---
name: designing-apis
description: The ability to define clear, consistent, and usable interfaces for software components, focusing on RESTful and GraphQL paradigms.
---

# Designing APIs

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Resources**: Are URLs noun-based (e.g., `/users` not `/getUsers`)?
- [ ] **Methods**: Are HTTP verbs used correctly (GET for read, POST for create)?
- [ ] **Status Codes**: Are standard codes used (200, 201, 400, 401, 403, 404, 500)?
- [ ] **Security**: Is authentication/authorization applied?
- [ ] **Documentation**: Is the OpenAPI/Swagger spec up to date?

## Feedback Loops
<!-- Validation steps -->
1. Define API contract (OpenAPI/Proto).
2. Generate mock server.
3. Validate with frontend/consumers.
4. Implement backend.
5. Run contract tests.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-openapi.sh`: Creates a standard OpenAPI 3.0 boilerplate for a new service.

```bash
#!/bin/bash
# scaffold-openapi.sh
# Usage: ./scaffold-openapi.sh <ServiceName>
# Creates a basic openapi.yaml for a new service.

SERVICE_NAME=$1

if [ -z "$SERVICE_NAME" ]; then
  echo "Usage: $0 <ServiceName>"
  exit 1
fi

FILENAME="openapi.yaml"

if [ -f "$FILENAME" ]; then
  echo "Error: $FILENAME already exists."
  exit 1
fi

cat <<EOF > "$FILENAME"
openapi: 3.0.3
info:
  title: $SERVICE_NAME API
  description: API definition for $SERVICE_NAME
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
paths:
  /health:
    get:
      summary: Health Check
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "ok"
components:
  schemas:
    Error:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
EOF

echo "Created $FILENAME for $SERVICE_NAME"
```

## Reference Implementation
<!-- Code patterns -->

### Standard REST Controller Pattern (TypeScript)

```typescript
import { Request, Response } from 'express';

// 1. Use DTOs for input validation
interface CreateUserDto {
  username: string;
  email: string;
}

export class UserController {
  
  // 2. Standard HTTP Methods
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateUserDto = req.body;
      
      // 3. Business Logic Delegation
      // const user = await this.userService.create(dto);
      
      // 4. Standard Response (201 Created)
      // res.status(201).json(user);
    } catch (error) {
      // 5. Error Handling
      // res.status(500).json({ message: error.message });
    }
  }
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [API Design Instructions](../../instructions/api-design.instructions.md)

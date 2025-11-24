# API Design Instructions
> **Apply To**: `openapi.yaml`, `swagger.json`, `**/*controller*`, `**/*route*`, `**/*.proto`

Guidelines for defining clear, consistent, and usable interfaces for software components, focusing on RESTful and GraphQL paradigms.

## <coding_standards>
1.  **Specification**: Use **OpenAPI 3.0+** for REST APIs.
2.  **Protocol**: Prefer **REST** for public APIs, **gRPC** for internal microservices.
3.  **Naming**: Use nouns for resources (e.g., `/users`), not verbs. Use `kebab-case` for URLs.
4.  **Status Codes**: Use standard HTTP status codes correctly (200, 201, 400, 401, 403, 404, 500).
</coding_standards>

## <best_practices>
*   **Statelessness**: Each request from client to server must contain all of the information necessary to understand the request.
*   **Uniform Interface**: Resources are manipulated using a fixed set of operations (GET, POST, PUT, DELETE).
*   **Resource-Oriented**: URLs should identify resources (nouns), not actions (verbs).
*   **Versioning**: APIs must be versioned to allow evolution without breaking clients (e.g., URI Versioning `/v1/`, Header Versioning).
</best_practices>

## <testing_protocols>
*   **Contract Testing**: Use tools like Pact to verify that API consumers and providers adhere to the defined contract.
*   **Fuzz Testing**: Test API endpoints with invalid or unexpected data to find vulnerabilities.
</testing_protocols>

## <tooling>
*   **Design**: Swagger Editor, Postman.
*   **Linting**: Spectral (OpenAPI linter).
*   **Documentation**: Swagger UI, Redoc.
</tooling>

## <concepts>
1.  **Resource**: The fundamental unit of information (e.g., `User`, `Order`), identified by a URI.
2.  **Idempotency**: The property that an operation can be applied multiple times without changing the result beyond the initial application (e.g., `PUT`, `DELETE`).
3.  **Content Negotiation**: The mechanism for serving different representations of a resource (JSON, XML) based on client request headers.
4.  **HATEOAS**: (Hypermedia As The Engine Of Application State) Including links in responses to guide clients through the API state machine.
</concepts>


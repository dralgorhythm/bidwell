# Security Instructions
> **Apply To**: `**/*`

Guidelines for ensuring the security, integrity, and confidentiality of the system and its data.

## <coding_standards>
1.  **Input Validation**: All external inputs (API parameters, file uploads, environment variables) MUST be validated against a strict allowlist (schema) before processing.
2.  **Output Encoding**: All user-generated content MUST be contextually encoded before rendering to prevent XSS (e.g., HTML entity encoding, JavaScript escaping).
3.  **Secrets Management**: Secrets (API keys, passwords, tokens) MUST NOT be committed to version control. Use environment variables or a secrets manager (e.g., Vault, AWS Secrets Manager).
4.  **Authentication**: MUST use established authentication libraries (e.g., Passport, Spring Security, Auth0) instead of implementing custom crypto or auth logic.
5.  **Least Privilege**: IAM roles and application permissions MUST be scoped to the minimum necessary access required for the function.
6.  **Cryptography**: MUST use strong, modern algorithms (e.g., Argon2id for passwords, AES-GCM for encryption). DO NOT use MD5, SHA1, or DES.
</coding_standards>

## <best_practices>
1.  **Defense in Depth**: Layer security controls (e.g., WAF + Input Validation + Database Constraints) so that if one fails, others provide protection.
2.  **Shift Left**: Integrate security testing (SAST, SCA) early in the development process (IDE, pre-commit hooks).
3.  **Fail Secure**: Ensure systems default to a secure state (e.g., deny access) upon failure or exception.
4.  **Audit Logging**: Log all security-critical events (login attempts, permission changes, sensitive data access) with sufficient context.
</best_practices>

## <testing_protocols>
1.  **SAST**: Run Static Application Security Testing tools on every commit to catch injection flaws and insecure configurations.
2.  **SCA**: Run Software Composition Analysis to detect vulnerabilities in dependencies (CVEs).
3.  **Penetration Testing**: Conduct periodic manual or automated penetration tests for critical paths.
</testing_protocols>

## <tooling>
*   **DAST**: OWASP ZAP (Scanning web applications)
*   **SAST**: SonarQube (Code quality and security)
*   **Container Security**: Trivy (Container and filesystem vulnerability scanner)
*   **Dependency Scanning**: Snyk (Dependency security scanning)
</tooling>

## <additional_section>
### Application Security
1.  **OWASP Top 10**: Mitigate risks outlined in the OWASP Top 10 (Injection, Broken Auth, Sensitive Data Exposure, etc.).
2.  **Parameterization**: ALWAYS use parameterized queries or ORMs to prevent SQL Injection.
3.  **Secure Headers**: Implement security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options).

### IAM Policy
1.  **MFA Everywhere**: Enforce Multi-Factor Authentication for all human users and sensitive operations.
2.  **Short-Lived Credentials**: Prefer short-lived tokens (OIDC, STS) over long-lived static access keys.
3.  **Centralized Identity**: Use a centralized Identity Provider (IdP) for user management.
4.  **Zero Trust**: Assume the network is hostile; authenticate and authorize every request.

### Threat Modeling Framework
1.  **STRIDE Analysis**: Evaluate threats using Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.
2.  **Trust Boundaries**: Identify where data crosses between levels of trust (e.g., Internet -> App, App -> DB).
3.  **Asset Identification**: Identify high-value assets (PII, credentials) and prioritize their protection.

### Security Review Checklist
1.  **Injection**: Are all inputs validated and queries parameterized?
2.  **AuthN/AuthZ**: Are authentication and authorization checks performed on every endpoint?
3.  **Data Protection**: Is sensitive data encrypted at rest and in transit?
4.  **Configuration**: Are cloud resources and containers configured securely (no root, no open buckets)?
5.  **Dependencies**: Are all libraries up-to-date and free of known CVEs?
</additional_section>


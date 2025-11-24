# Compliance & Governance Instructions
> **Apply To**: `**/*`

Guidelines for ensuring compliance with regulatory requirements and governance policies across all development activities.

## <coding_standards>
1.  **Encryption**: Encrypt data at rest (disk) and in transit (network).
2.  **PII Redaction**: Always redact Personally Identifiable Information (PII) from logs.
3.  **Access Control**: Log all access to sensitive data and enforce least privilege.
4.  **Right to be Forgotten**: Implement mechanisms to permanently delete user data upon request (GDPR/CCPA).
</coding_standards>

## <best_practices>
1.  **Consent Management**: Obtain and record explicit consent for data collection.
2.  **Data Inventory**: Maintain an up-to-date inventory of all data assets and their sensitivity levels.
3.  **Vendor Risk Management**: Assess the security and compliance posture of third-party vendors.
4.  **Incident Response**: Have a documented and tested plan for data breaches.
</best_practices>

## <testing_protocols>
*   **Compliance Audit**: Regularly audit code and infrastructure for compliance violations.
</testing_protocols>

## <tooling>
*   **Compliance Scanners**: Tools to scan for PII leaks or compliance violations (e.g., git-secrets).
</tooling>

## <concepts>
1.  **Data Minimization**: Collect only the data that is strictly necessary for the purpose.
2.  **Data Residency**: Store data in the correct geographic region to comply with local laws.
3.  **Audit Trails**: Immutable logs of who did what, when, and why.
</concepts>


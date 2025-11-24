# Dependency Management Instructions
> **Apply To**: `package.json`, `pom.xml`, `build.gradle`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `go.mod`

Guidelines for identifying, resolving, and maintaining third-party code libraries to ensure stability, security, and compatibility.

## <coding_standards>
1.  **Lock Files**: Always commit lock files (`package-lock.json`, `poetry.lock`, `go.sum`) to version control.
2.  **Semantic Versioning**: Follow SemVer for your own packages and respect it for dependencies.
3.  **Dev Dependencies**: Strictly separate production dependencies from development dependencies.
</coding_standards>

## <best_practices>
*   **Minimalism**: Avoid adding heavy dependencies for simple utility functions (e.g., don't import `lodash` for `Array.map`).
*   **Pinning**: Always pin dependencies to specific versions (or tight ranges) in applications to prevent "it works on my machine" issues.
*   **Regular Audits**: Frequently check for known vulnerabilities (CVEs).
*   **License Compliance**: Ensure all dependencies have licenses compatible with your project's license.
</best_practices>

## <testing_protocols>
*   **Vulnerability Scanning**: Run `npm audit` or equivalent in CI pipeline.
*   **Build Verification**: Ensure the application builds cleanly with a fresh install of dependencies (`npm ci`).
</testing_protocols>

## <tooling>
*   **Automation**: Renovate, Dependabot.
*   **Auditing**: `npm audit`, `pip-audit`, OWASP Dependency-Check, Snyk.
*   **License Checking**: FOSSA, License-Checker.
</tooling>

## <concepts>
1.  **Semantic Versioning (SemVer)**: A versioning scheme (`MAJOR.MINOR.PATCH`) conveying meaning about the underlying changes.
2.  **Transitive Dependency**: A dependency of a dependency.
3.  **Lock File**: A file (`package-lock.json`, `poetry.lock`) that records the exact versions of the dependency tree to ensure reproducible builds.
4.  **Diamond Dependency**: When two dependencies require different versions of the same shared library.
5.  **SBOM**: (Software Bill of Materials) A comprehensive list of all components in the software.
</concepts>


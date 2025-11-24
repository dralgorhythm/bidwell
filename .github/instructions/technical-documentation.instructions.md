# Technical Documentation Instructions
> **Apply To**: `**/*.md`, `**/README.*`, `**/docs/**/*`

Guidelines for creating clear, comprehensive, and maintainable technical documentation.

## <coding_standards>
1.  **Format**: Use standard Markdown (CommonMark).
2.  **Structure**: Every directory should have a `README.md`.
3.  **Frontmatter**: Use YAML frontmatter for metadata where supported (e.g., Jekyll, Hugo).
4.  **Storage Location**: All planning and design documents **MUST** be stored in the `./artifacts/` directory.
</coding_standards>

## <best_practices>
*   **Voice**: Active, friendly, and professional.
*   **Formatting**: Use **bold** for UI elements, `code` for technical terms.
*   **Code Snippets**: Always include language hints (e.g., ```python).
*   **Links**: Use relative links for internal files to ensure they work in different contexts (e.g., GitHub vs. local).
*   **Validation**: Verify that all code examples are runnable and up-to-date.
*   **Accessibility**: Use alt text for images and ensure proper heading hierarchy.
</best_practices>

## <testing_protocols>
*   **Link Checking**: Use `markdown-link-check` to ensure all links are valid.
*   **Spell Check**: Use `cspell` or similar to catch typos.
</testing_protocols>

## <tooling>
*   **Static Site Generators**: MkDocs, Docusaurus, Hugo.
*   **Diagrams**: Mermaid.
*   **Linting**: markdownlint.
</tooling>

## <concepts>
1.  **Audience Awareness**: Writing for the intended reader (e.g., End User vs. API Developer vs. DevOps).
2.  **Docs as Code**: Treating documentation like source code (Version Control, CI/CD, Reviews).
3.  **Information Architecture**: Organizing content logically (e.g., Tutorials -> How-To Guides -> Reference -> Explanation).
4.  **Single Source of Truth**: Avoiding duplication to prevent conflicting information.
5.  **Diataxis Framework**: Structuring documentation into four quadrants: Tutorials (learning-oriented), How-to Guides (problem-oriented), Reference (information-oriented), and Explanation (understanding-oriented).
</concepts>


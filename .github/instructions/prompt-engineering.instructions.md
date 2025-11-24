# Prompt Engineering Instructions
> **Apply To**: `prompt-engineering/**/*.md`, `.github/agents/*.md`

You are editing a Prompt Engineering file. Adhere to the **Unified Agent Context Standard (UACS)**.

## <coding_standards>
1.  **XML Delimiters**: Use XML tags for all structural elements (e.g., `<role>`, `<constraints>`, `<examples>`).
2.  **No "Think Step-by-Step"**: Do not use generic CoT phrases. Use `<thinking_level>High</thinking_level>` instead.
3.  **Modular Context**: Do not hardcode rules. Link to `.github/instructions/` or `shared-context/`.
</coding_standards>

## <best_practices>
*   **Handoffs**: Must be defined in the YAML frontmatter.
*   **Tools**: Must be explicitly listed.
*   **Description**: Must be concise (under 100 chars).
</best_practices>

## <tooling>
*   **Testing**: OpenAI Playground, Anthropic Console.
*   **Evaluation**: Promptfoo.
</tooling>


# Agent Output Standards
> **Apply To**: `**/*`

Standards for formatting, structuring, and presenting output across all agent interactions and generated artifacts.

## <coding_standards>
1.  **Structural Formatting**:
    *   **XML/Markdown Hybrid**: Use XML tags (e.g., `<analysis>`, `<code_block>`) to structure responses for machine readability and clarity.
    *   **Markdown Styling**: Use standard Markdown for text formatting (headers, lists, bolding).
    *   **Code Blocks**: Always specify the language in code blocks (e.g., \`\`\`python).

2.  **Reasoning & Thinking**:
    *   **Mandatory Planning**: For complex tasks, begin with a `<thinking>` or `<plan>` block.
    *   **Chain of Thought**: Show the logical steps taken to arrive at a solution.
    *   **Self-Correction**: Explicitly state if a plan was revised during the thinking process.

3.  **Code Generation Quality**:
    *   **Idiomatic Code**: Use modern language features and best practices.
    *   **Documentation**: Include docstrings and comments explaining *why*, not just *what*.
    *   **Error Handling**: Include robust error handling and edge case management.
    *   **No Placeholders**: Avoid `// ... rest of code` unless explicitly requested or strictly necessary for brevity in a known context.

4.  **Interaction Patterns**:
    *   **Confirmation**: Briefly confirm understanding of the task before executing.
    *   **Clarification**: Ask clarifying questions *only* if the request is ambiguous or dangerous.
    *   **Handoffs**: When suggesting other agents, use the `@agent-name` convention.
</coding_standards>


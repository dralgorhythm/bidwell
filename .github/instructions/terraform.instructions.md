# Terraform Instructions
> **Apply To**: `**/*.tf`, `**/*.tfvars`

You are writing Terraform (HCL) code. Adhere to the following strict standards.

## <coding_standards>
1.  **Declarative**: Write declarative configurations. Avoid complex logic in HCL.
2.  **Modules**: Use modules for reusable infrastructure components.
3.  **Naming**: Use snake_case for resource names. Include resource type prefix (e.g., `aws_vpc`).
4.  **Variables**: Define all inputs in `variables.tf`, outputs in `outputs.tf`.
5.  **State**: Always use remote state with locking (e.g., S3 + DynamoDB, Terraform Cloud).
6.  **Secrets**: Never hardcode secrets. Use variables with `sensitive = true` or external secret managers.
7.  **Least Privilege**: IAM policies should grant minimum required permissions.
8.  **Encryption**: Enable encryption at rest and in transit for all data stores.
9.  **Public Access**: Block public access by default unless explicitly required.
</coding_standards>

## <best_practices>
1.  **Plan Review**: Always review `terraform plan` output before applying.
</best_practices>

## <testing_protocols>
1.  **Format**: Run `terraform fmt` before committing.
2.  **Validate**: Run `terraform validate` to check syntax.
</testing_protocols>

## <tooling>
*   **Lint**: `tflint` (Best practices and provider-specific rules).
*   **Security Scan**: `checkov` or `tfsec` (Detect security issues).
</tooling>

## <concepts>
1.  **Immutable Infrastructure**: Replace servers rather than modifying them in place.
2.  **Infrastructure as Code**: Manage infrastructure using configuration files.
</concepts>


---
name: Writing Terraform
description: Designing and implementing cloud infrastructure using Terraform's declarative configuration language (HCL).
---

# Writing Terraform

## Workflows

### 1. Scaffold Terraform Module

Creates a standard Terraform module structure with best practices.

```bash
#!/bin/bash
# create-terraform-module.sh
# Usage: ./create-terraform-module.sh <module-name>

MODULE_NAME=$1

if [ -z "$MODULE_NAME" ]; then
  echo "Usage: $0 <module-name>"
  exit 1
fi

mkdir -p "$MODULE_NAME"/{examples,tests}
cd "$MODULE_NAME"

# Create main.tf
cat <<'EOF' > main.tf
# Main resource definitions

terraform {
  required_version = ">= 1.5"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Resources go here
EOF

# Create variables.tf
cat <<'EOF' > variables.tf
# Input variables

variable "name" {
  description = "Name identifier for resources"
  type        = string
  
  validation {
    condition     = length(var.name) > 0 && length(var.name) <= 64
    error_message = "Name must be between 1 and 64 characters."
  }
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
EOF

# Create outputs.tf
cat <<'EOF' > outputs.tf
# Output values

# Example output
# output "resource_id" {
#   description = "ID of the created resource"
#   value       = aws_resource.example.id
# }
EOF

# Create README.md
cat <<EOF > README.md
# Terraform Module: $MODULE_NAME

## Usage

\`\`\`hcl
module "example" {
  source = "./$MODULE_NAME"
  
  name        = "example-resource"
  environment = "dev"
}
\`\`\`
EOF

# Create .gitignore
cat <<EOF > .gitignore
.terraform/
*.tfstate
*.tfstate.backup
.terraform.lock.hcl
*.tfvars
!example.tfvars
EOF

echo "Terraform module scaffolded: $MODULE_NAME"
```

## Feedback Loops

### 1. Formatting

* **Trigger**: On save.
* **Action**: Run `terraform fmt -recursive`.
* **Outcome**: Consistent HCL style.

### 2. Validation

* **Trigger**: Pre-commit.
* **Action**: Run `terraform validate`.
* **Outcome**: Ensure syntax and configuration validity.

### 3. Security Scan

* **Trigger**: CI/CD.
* **Action**: Run `trivy config .` or `tfsec`.

## Resources
<!-- Links to external docs or local reference files -->
- [Terraform Instructions](../../instructions/terraform.instructions.md)


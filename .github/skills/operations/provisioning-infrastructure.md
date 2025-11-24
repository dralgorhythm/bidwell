---
name: provisioning-infrastructure
description: The ability to design, deploy, and manage infrastructure using code, following the Graduated Hosting Strategy with Terraform.
---

# Provisioning Infrastructure

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Hosting Tier**: Which tier is this for? (Static/GitHub Pages, Agile/Railway, Production/AWS)
- [ ] **IaC Tool**: Is Terraform being used for AWS infrastructure?
- [ ] **Secrets**: Are secrets managed via GitHub Secrets/AWS Secrets Manager and not committed?
- [ ] **Review**: Has the infrastructure plan been reviewed before deployment?
- [ ] **Tagging**: Are resources tagged with Owner, Environment, and CostCenter?
- [ ] **Backup**: Is deletion protection enabled for stateful resources (DBs, Buckets)?

## Feedback Loops
<!-- Validation steps -->
1. Write IaC code (Terraform).
2. Run linter (`tflint`).
3. Run security scan (`tfsec`).
4. Run plan (`terraform plan`).
5. Apply to staging.
6. Verify.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-terraform-project.sh`: Creates a standard Terraform project structure.

```bash
#!/bin/bash
# scaffold-terraform-project.sh
# Usage: ./scaffold-terraform-project.sh <ProjectName>

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 <ProjectName>"
  exit 1
fi

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create standard Terraform files
touch main.tf variables.tf outputs.tf provider.tf

# Create .gitignore
echo ".terraform" >> .gitignore
echo "*.tfstate" >> .gitignore
echo "*.tfstate.backup" >> .gitignore
echo ".env" >> .gitignore

echo "Terraform project scaffolded: $PROJECT_NAME"
```

## Reference Implementation
<!-- Code patterns -->

### Secure S3 Bucket (Terraform)

Demonstrates encryption, versioning, and blocking public access using Terraform.

```hcl
# main.tf

resource "aws_s3_bucket" "secure_bucket" {
  bucket = var.bucket_name

  # Force destroy for dev environments only
  force_destroy = var.environment == "dev"

  tags = {
    Name        = var.bucket_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# 1. Enable Versioning (Recovery)
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.secure_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# 2. Enable Server-Side Encryption (Security)
resource "aws_s3_bucket_server_side_encryption_configuration" "encryption" {
  bucket = aws_s3_bucket.secure_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# 3. Block Public Access (Security)
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.secure_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Infrastructure as Code Instructions](../../instructions/infrastructure-as-code.instructions.md)
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)



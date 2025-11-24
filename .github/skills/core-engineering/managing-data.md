---
name: managing-data
description: Designing and implementing data strategies using Postgres (Railway/AWS RDS), Object Storage (S3), and Vector Search (pgvector) following the Graduated Hosting Strategy.
---

# Managing Data

## Workflows

### 1. Provision Postgres Database (Railway)

Sets up a Postgres database on Railway for the Agile tier.

```bash
# Using Railway CLI
railway add postgres
```

### 2. Configure AWS S3 (Object Storage)

Sets up an S3 bucket for object storage.

```bash
# Using Terraform (via scaffolded module)
module "s3_bucket" {
  source = "./modules/s3"
  bucket_name = "my-app-assets"
  environment = "prod"
}
```

### 3. Enable pgvector

Enables vector search capabilities in Postgres.

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Feedback Loops

### 1. Database Migrations

* **Trigger**: Pre-deploy.
* **Action**: Run migrations (e.g., `sqlx migrate run` or `prisma migrate deploy`).
* **Outcome**: Schema is up-to-date without downtime.

### 2. Local Verification

* **Trigger**: Pull Request.
* **Action**: Spin up local Docker Postgres -> Run Tests -> Tear down.
* **Outcome**: Isolated testing environment.

## Reference Implementation

### Connecting to Postgres

```typescript
// db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const query = async (text: string, params: any[]) => {
  return pool.query(text, params);
};
```

### Using AWS S3 SDK

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });

await s3.send(new PutObjectCommand({
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: "hello.txt",
  Body: "Hello S3!",
}));
```

## Resources
- [Database Instructions](../../instructions/database.instructions.md)
- [Railway Documentation](https://docs.railway.app/guides/postgresql)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)

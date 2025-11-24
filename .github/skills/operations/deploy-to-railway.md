---
name: deploy-to-railway
description: Deploy an application to Railway (Agile Tier) for rapid prototyping and ephemeral environments.
---

# Deploy to Railway

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Prerequisites**: Is the Railway CLI installed (`npm i -g @railway/cli`)?
- [ ] **Project**: Is there a `railway.toml` or Dockerfile present?
- [ ] **Secrets**: Are secrets managed via Railway Variables?
- [ ] **Service**: Is the service created in the Railway project?

## Feedback Loops
<!-- Validation steps -->
1. Run `railway login`.
2. Run `railway link` to associate with project.
3. Run `railway up` to deploy.
4. Verify deployment URL.
5. Check logs via `railway logs`.

## Utility Scripts
<!-- Reference executable scripts -->
- `railway.toml`: Basic configuration.

```toml
[build]
builder = "nixpacks"
buildCommand = "pnpm build"

[deploy]
startCommand = "pnpm start"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
```

## Reference Implementation
<!-- Code patterns -->
```bash
# Deploy workflow
railway login
railway init
railway up --detach
```

## Resources
<!-- Links to external docs or local reference files -->
- [Railway Documentation](https://docs.railway.app/)
- [Cloud Native Instructions](../../instructions/cloud-native.instructions.md)


---
name: defense-in-depth
description: Layering security controls throughout the system architecture to provide redundancy and minimize the impact of a single control failure.
---

# Defense in Depth

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Identify Assets**: List the data and resources that need protection.
- [ ] **Map Attack Surface**: Identify all entry points and potential vectors.
- [ ] **Layer 1 - Network**: Apply firewalls, VPCs, and network segmentation.
- [ ] **Layer 2 - Application**: Implement authentication, authorization, and input validation.
- [ ] **Layer 3 - Data**: Apply encryption at rest and in transit.
- [ ] **Layer 4 - Monitoring**: Set up logging, auditing, and intrusion detection.

## Feedback Loops
<!-- Validation steps -->
1. Perform threat modeling on the design.
2. Conduct penetration testing or vulnerability scanning.
3. Review logs for attempted breaches or anomalies.

## Utility Scripts
<!-- Reference executable scripts -->
- `scripts/security-audit.sh`: Checks for common misconfigurations.

## Reference Implementation
<!-- Code patterns -->
```typescript
// Example: Layered Validation

// 1. Network/Infrastructure (e.g., WAF - External to code)

// 2. Application Level (Input Validation)
function processUserData(input: any) {
  const schema = z.object({
    userId: z.string().uuid(),
    role: z.enum(['user', 'admin'])
  });
  const data = schema.parse(input); // Fails fast if invalid

  // 3. Business Logic (Authorization)
  if (!currentUser.hasPermission('EDIT_USER')) {
    throw new ForbiddenError();
  }

  // 4. Data Layer (Prepared Statements/ORM)
  return db.users.update({ where: { id: data.userId }, data });
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Securing Applications](../security/securing-applications.md)
- [Modeling Threats](../security/modeling-threats.md)

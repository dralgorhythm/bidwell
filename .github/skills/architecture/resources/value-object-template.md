# Resource: Value Object Template

## Definition
A Value Object is an object that contains attributes but has no conceptual identity. They should be treated as immutable.

## Checklist
- [ ] **Immutability**: Are all properties read-only?
- [ ] **Equality**: Is equality based on values, not reference?
- [ ] **Validation**: Is the state validated upon creation?
- [ ] **Behavior**: Does it contain logic relevant to the values?

## Template (TypeScript)
```typescript
export class ValueObject<T> {
  constructor(public readonly props: T) {
    this.validate(props);
    Object.freeze(this);
  }

  protected validate(props: T): void {
    // Override to enforce invariants
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
```

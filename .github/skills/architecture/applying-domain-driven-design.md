---
name: applying-domain-driven-design
description: Modeling software to match a domain (Entities, Aggregates, Bounded Contexts).
---

# Applying Domain-Driven Design

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Language**: Are we using the Ubiquitous Language in class/method names?
- [ ] **Boundaries**: Is the Bounded Context clearly defined?
- [ ] **Aggregates**: Do Aggregates protect their own invariants?
- [ ] **Value Objects**: Are Value Objects immutable?
- [ ] **Repositories**: Do Repositories only return Aggregates?

## Feedback Loops
<!-- Validation steps -->
1. Define Ubiquitous Language with experts.
2. Model Domain (Entities/Value Objects).
3. Implement Application Services.
4. Verify with experts (Code Walkthrough).
5. Implement Infrastructure.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-bounded-context.sh`: Creates a standard directory structure for a new Bounded Context.

```bash
#!/bin/bash
# scaffold-bounded-context.sh
# Usage: ./scaffold-bounded-context.sh <ContextName>
# Creates a standard DDD directory structure for a Bounded Context.

CONTEXT_NAME=$1

if [ -z "$CONTEXT_NAME" ]; then
  echo "Usage: $0 <ContextName>"
  exit 1
fi

echo "Scaffolding Bounded Context: $CONTEXT_NAME"

mkdir -p "src/$CONTEXT_NAME/domain/model"
mkdir -p "src/$CONTEXT_NAME/domain/service"
mkdir -p "src/$CONTEXT_NAME/application/service"
mkdir -p "src/$CONTEXT_NAME/infrastructure/repository"
mkdir -p "src/$CONTEXT_NAME/infrastructure/api"
mkdir -p "src/$CONTEXT_NAME/tests"

touch "src/$CONTEXT_NAME/README.md"

echo "Done. Structure created in src/$CONTEXT_NAME"
```

## Reference Implementation
<!-- Code patterns -->

### Aggregate Root Pattern

```typescript
// Generic Aggregate Root with Event Sourcing capabilities
abstract class AggregateRoot {
  private _domainEvents: IDomainEvent[] = [];

  protected addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

  public get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}

// Example Usage
class Order extends AggregateRoot {
  private items: OrderItem[] = [];
  private status: OrderStatus;

  constructor(public readonly id: string) {
    super();
    this.status = OrderStatus.Created;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
    this.addDomainEvent(new OrderItemAdded(this.id, item));
  }
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Domain-Driven Design Instructions](../../instructions/ddd.instructions.md)
- [Value Object Template](./resources/value-object-template.md)

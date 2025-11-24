---
name: debugging-and-troubleshooting
description: The systematic process of identifying, isolating, and resolving defects or unexpected behavior in software systems.
---

# Debugging and Troubleshooting

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Reproduction**: Do we have a minimal reproduction case?
- [ ] **Logs**: Have we checked the logs for stack traces or error codes?
- [ ] **Recent Changes**: What changed recently? (Check `git log` or `git bisect`).
- [ ] **Environment**: Is this happening in all environments (Dev, Prod) or just one?

## Feedback Loops
<!-- Validation steps -->
1. Reproduce the issue with a test case.
2. Apply fix.
3. Verify the test case passes.
4. Verify no regression in related areas.

## Utility Scripts
<!-- Reference executable scripts -->
- `debug-context.sh`: Collects environment variables and recent logs to aid debugging.

```bash
#!/bin/bash
# debug-context.sh
# Usage: ./debug-context.sh <LogFile>

LOG_FILE=$1

echo "--- System Info ---"
uname -a
date

echo "--- Node/Runtime Versions ---"
node -v || echo "Node not found"
python3 --version || echo "Python not found"

echo "--- Environment Variables (Safe) ---"
env | grep -v -E "KEY|SECRET|TOKEN|PASSWORD" | sort

if [ -n "$LOG_FILE" ] && [ -f "$LOG_FILE" ]; then
  echo "--- Recent Logs (Last 50 lines) ---"
  tail -n 50 "$LOG_FILE"
else
  echo "--- No Log File Provided or Found ---"
fi
```

## Reference Implementation
<!-- Code patterns -->

### Structured Logging (Python)

Using structured logs (JSON) makes debugging easier in aggregation tools.

```python
import logging
import json
import sys

class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "line": record.lineno
        }
        # Add extra context if available
        if hasattr(record, "user_id"):
            log_record["user_id"] = record.user_id
            
        return json.dumps(log_record)

logger = logging.getLogger("app")
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Usage
def process_request(user_id):
    logger.info("Processing request", extra={"user_id": user_id})
    try:
        # ... logic ...
        raise ValueError("Invalid input")
    except Exception as e:
        logger.error(f"Failed to process: {str(e)}", extra={"user_id": user_id})

process_request("user_123")
```

## Resources
<!-- Links to external docs or local reference files -->
- [Core Engineering Instructions](../../instructions/core-engineering.instructions.md)


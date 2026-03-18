# AGENTS Guide

This repository allows automated and AI-assisted contributions. Follow these project-specific rules:

## Scope and style

- Keep changes minimal and task-focused.
- Preserve existing architecture and naming patterns.
- Avoid introducing new dependencies unless required.

## Quality bar

- Run tests before finalizing changes:

```bash
pnpm run test:run
pnpm run build
```

- Add or update tests when behavior changes.
- Update docs for any user-facing or workflow change.

## Pull requests

- Use clear, descriptive titles.
- Explain what changed, why, and how it was validated.
- Link related issues where applicable.

## Safety

- Do not commit secrets or credentials.
- Respect [SECURITY.md](./SECURITY.md) for vulnerability disclosure.

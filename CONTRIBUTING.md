# Contributing Guide

Thanks for contributing to The Cognitive Decay Diagnostic.

## Prerequisites

- Node.js 20+
- pnpm 10+

## Local setup

```bash
pnpm install
pnpm run dev
```

## Development workflow

1. Create a feature branch from `main`.
2. Make focused changes with clear commit messages.
3. Run checks before opening a pull request:

```bash
pnpm run test:run
pnpm run build
```

## Pull request checklist

- Keep PR scope small and focused.
- Add or update tests when behavior changes.
- Update documentation when applicable.
- Ensure CI passes.

## Reporting issues

- Use GitHub Issues for bugs and feature requests.
- Include reproduction steps, expected behavior, and actual behavior.

## Conduct

By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

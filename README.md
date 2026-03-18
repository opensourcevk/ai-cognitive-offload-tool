# The Cognitive Decay Diagnostic

A single-page React app that measures AI Decay risk and computes a Cognitive Sustainability Score (0-10) from a 7-question scenario-based assessment.

Styling uses Material Design via Materialize CSS (CDN).
Results include area-level impact insights (for example, Debugging Muscle) with targeted recovery drills.

## Run locally

```bash
npm install
npm run dev
```

## Run unit tests

```bash
npm test
```

or one-shot in CI style:

```bash
npm run test:run
```

## GitHub Actions and deployment

- `CI` workflow runs unit tests and build on every push and pull request.
- `Dependency Review` workflow checks dependency risk on pull requests.
- `Deploy To GitHub Pages` runs on `main` and publishes `dist/` to GitHub Pages.

For Pages in repository settings, set:
- Build and deployment source: `GitHub Actions`

# The Cognitive Decay Diagnostic

A single-page React app that measures AI Decay risk and computes a Cognitive Sustainability Score (0-10) from a 7-question scenario-based assessment.

Styling uses Material Design via Materialize CSS (CDN).
Results include area-level impact insights (for example, Debugging Muscle) with targeted recovery drills.

## Research and design basis

Question design uses:
- Scenario-based prompts (SJT style)
- Behaviorally anchored response options (BARS style from low to high cognitive autonomy)

Key references used while crafting constructs:
- MIT / Kosmyna et al. (2025 preprint): https://arxiv.org/abs/2506.08872
- Risko & Gilbert (2016), Cognitive Offloading: https://doi.org/10.1016/j.tics.2015.11.002
- Risko et al. (2019), memory offloading behavior: https://doi.org/10.1016/j.cognition.2018.11.017
- ILO Working Paper 140 (2025), generative AI exposure: https://doi.org/10.54394/HETP0387
- McDaniel et al. (2007), SJT response instructions and validity: https://doi.org/10.1111/j.1744-6570.2007.00065.x

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

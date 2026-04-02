# Notificator Docs Contributor Guide

This directory contains the Astro Starlight documentation site used for product onboarding, API usage, and developer integration.

## Prerequisites

- Node.js `>=22.12.0` (Astro requirement)
- npm

## Local Setup

```bash
cd docs
npm install
npm run dev
```

Local URL: `http://localhost:4321`

## Writing and Updating Docs

Main content lives in `src/content/docs/`:

- `index.mdx` landing page
- `guides/` task and workflow docs
- `reference/` API/spec reference docs

When adding a new page:

1. Create a new `.md` or `.mdx` file under `src/content/docs/guides/` or `src/content/docs/reference/`.
2. Add frontmatter (`title`, `description`).
3. Add the page to sidebar in `astro.config.mjs`.
4. Run local preview and verify links.

## Contribution Checklist

Before opening a PR:

1. Validate commands and URLs in all code blocks.
2. Keep examples aligned with production domain (`public-api.notificator-project.com`).
3. Ensure user-facing and developer-facing docs stay separated by audience.
4. Build locally to catch content/config issues.

## Build and Preview

```bash
cd docs
npm run build
npm run preview
```

Build output: `docs/dist`

## Netlify Deployment (Docs Site)

Use a dedicated Netlify site for docs.

- Base directory: `docs`
- Build command: `npm run build`
- Publish directory: `dist`

## Optional: Push Docs to Separate Repository

If docs should live in a separate repo as well:

```bash
# From project root
git remote add docs-origin <DOCS_REPO_URL>
git subtree push --prefix docs docs-origin main
```

Notes:

- This does not modify default `origin`.
- Use your docs repo default branch if not `main`.
- Repeat subtree push whenever docs changes should be published there.

## Troubleshooting

- `Node.js ... is not supported by Astro`: upgrade to Node `>=22.12.0`.
- Sidebar item missing: confirm `astro.config.mjs` includes the page slug.
- Broken links after rename: update all internal links under `src/content/docs/`.
- Stale generated content: clean build artifacts and rerun `npm run build`.

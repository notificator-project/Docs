# Notificator Docs Contributor Guide

This folder contains the Astro + Starlight documentation site for the Notificator Project.
It includes end-user guides, developer integration guides, and API reference content.

## Tech Stack

- Astro 6
- Starlight
- Markdown and MDX content collections

## Attribution

This documentation site is built with the Astro Starlight docs framework.

- Astro: https://astro.build/
- Starlight: https://starlight.astro.build/

## Prerequisites

- Node.js 22.12.0 or newer
- npm

## Quick Start

```bash
cd docs
npm install
npm run dev
```

Local site: http://localhost:4321

## Available Commands

```bash
npm run dev      # Start local dev server
npm run build    # Create production build
npm run preview  # Preview production build locally
```

## Project Structure

- src/content/docs/index.mdx: Developer overview landing page
- src/content/docs/guides/: Task-based documentation for users and developers
- src/content/docs/reference/: API reference pages
- astro.config.mjs: Starlight config, including sidebar navigation

## Authoring Workflow

1. Add or edit a page in src/content/docs/guides/ or src/content/docs/reference/.
2. Include frontmatter at minimum:

```md
---
title: Page Title
description: One-sentence summary shown in previews/search
---
```

3. If the page is new, register it in the sidebar in astro.config.mjs.
4. Run npm run dev and verify rendering, links, headings, and code blocks.
5. Run npm run build before opening a PR.

## Writing Standards

- Keep guides action-oriented and step-by-step.
- Prefer short sections with explicit outcomes.
- Match all API examples to the production API domain: public-api.notificator-project.com.
- Keep user guide content and developer guide content clearly separated.
- Validate every command and request payload you document.

## Definition of Done (Docs Changes)

Before opening a PR, confirm all items below:

1. New or changed pages are linked from the sidebar when applicable.
2. Commands and URLs were executed or validated.
3. Internal links are not broken.
4. Build succeeds with npm run build.
5. Language is concise, consistent, and audience-appropriate.

## Troubleshooting

- Astro Node version error: upgrade Node to 22.12.0 or newer.
- Page does not appear in navigation: verify slug entry in astro.config.mjs sidebar.
- Broken links after renaming files: search and update links under src/content/docs/.
- Unexpected stale output: remove old build artifacts and run npm run build again.

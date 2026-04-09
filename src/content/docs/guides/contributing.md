---
title: Contributing to Documentation
description: How to propose, author, and submit documentation improvements for Notificator Project Docs.
---

Thank you for helping improve Notificator Project Docs.

You can contribute in two simple ways:

1. Open an issue if you found a bug, broken docs link, or unclear instructions.
2. Open a pull request if you already have a fix or content improvement ready.

Both are equally welcome. If you are unsure, start with an issue and we can guide the next steps.

## Repository

- Docs repository: https://github.com/notificator-project/Docs
- Issues: https://github.com/notificator-project/Docs/issues
- Pull requests: https://github.com/notificator-project/Docs/pulls

## Prerequisites

- Node.js 22.12.0 or newer
- npm

## Local Setup

1. Clone your fork of the docs repository.
2. Install dependencies.
3. Start the docs site.

```bash
cd docs
npm install
npm run dev
```

Docs run locally at http://localhost:4321.

## Contribution Workflow

1. Create a branch for your docs change.
2. Add or edit pages under src/content/docs/.
3. If you add a new page, include it in sidebar navigation in astro.config.mjs.
4. Verify links, headings, and examples in the local site.
5. Build docs before opening a pull request.

```bash
npm run build
```

## Content Standards

- Write concise, task-oriented instructions.
- Keep user guides and developer guides clearly separated.
- Use the production API domain in examples:
  - api.notificator-project.com
- Validate commands and request payloads before publishing.

## Pull Request Checklist

- Navigation updated for any new page.
- Internal links are valid.
- Build succeeds locally.
- Summary clearly explains what changed and why.

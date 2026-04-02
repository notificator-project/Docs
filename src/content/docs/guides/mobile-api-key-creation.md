---
title: Create API Key (Mobile)
description: Generate, copy, and manage API keys from the mobile app Profile screen.
---

## Where to create keys

In the mobile app:

- Open Profile/Settings.
- Find the API Keys section.
- Tap Create New API Key.

## Key creation flow

1. Enter a descriptive name (for example: `wordpress-prod`, `staging`, `automation`).
2. Create the key.
3. Copy it immediately and store it in your password manager.

Key format:

`wpnotif_<random-value>`

## Important notes

- Treat keys as secrets.
- Use separate keys per environment/system.
- Revoke compromised keys immediately.

## Use key in requests

Recommended header:

`Authorization: Bearer wpnotif_...`

Also supported:

- `X-API-Key: wpnotif_...`
- `X-WPNOTIF-Key: wpnotif_...`

## Next step

Use this key in [WordPress Plugin Setup](/guides/wordpress-plugin-setup/).

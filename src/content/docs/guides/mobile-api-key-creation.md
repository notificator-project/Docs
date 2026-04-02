---
title: Create API Key (Mobile)
description: Generate, copy, and manage API keys from the mobile app Profile screen.
---

## Where to create keys

In the mobile app:

- Open Profile/Settings.
- Find the API Keys section.
- Tap Create API Key.

## Key creation flow

1. Enter a descriptive name (for example: `wordpress-prod`, `staging`, `automation`).
2. Select key type:
	- `WordPress` -> `wordpress_server`
	- `Public API` -> `public_client`
	- `Internal` -> `internal_service`
3. Create the key.
3. Copy it immediately and store it in your password manager.

In the API Keys list, each key now shows:

- Type
- Last used timestamp
- Allowed domains count

Key format:

`wpnotif_<random-value>`

## Important notes

- Treat keys as secrets.
- Use separate keys per environment/system.
- Use the correct key type per endpoint.
- Revoke compromised keys immediately.

## Endpoint compatibility by key type

- `wordpress_server`: use with `wpnotif-api` (WordPress plugin/server flow)
- `public_client`: use with `public-notify` (external/public integrations)
- `internal_service`: allowed on both endpoints

## Use key in requests

Recommended header:

`Authorization: Bearer wpnotif_...`

Also supported:

- `X-API-Key: wpnotif_...`
- `X-WPNOTIF-Key: wpnotif_...`

## Next step

- For `wordpress_server` keys: [WordPress Plugin Setup](/guides/wordpress-plugin-setup/)
- For `public_client` keys: [Quick Start](/guides/quick-start/)

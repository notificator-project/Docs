---
title: Quick Start
description: Send your first third-party notification in under 2 minutes.
---

:::tip[Before you start]
Have a valid API key ready and confirm it is type `public_client` (or `internal_service`).
:::

## 1. Pick your auth header

Use one of the following:

- `Authorization: Bearer wpnotif_...` (recommended)
- `X-API-Key: wpnotif_...`
- `X-WPNOTIF-Key: wpnotif_...`

Use a key with type `public_client` (or `internal_service`).

`wordpress_server` keys are rejected by `public-notify`.

:::caution[Most common error]
If you send a `wordpress_server` key to `public-notify`, authentication fails even if the key format is correct.
:::

## 2. Send a test request

```bash
curl -X POST "https://api.notificator-project.com" \
  -H "Authorization: Bearer wpnotif_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Queue Backlog High",
    "body": "Order queue is above threshold.",
    "source": "erp_worker",
    "category": "task",
    "severity": "warning"
  }'
```

## 3. Validate response

Successful response example:

```json
{
  "ok": true,
  "kind": "external_notification",
  "stored": true,
  "pushSent": true,
  "mqttEnabled": true,
  "timestamp": "2026-03-29T12:00:00.000Z"
}
```

## 4. Open interactive docs

- OpenAPI JSON: `https://api.notificator-project.com?format=openapi`

:::tip[Need endpoint behavior details?]
Continue with [Public Notify API](/reference/public-notify/) for full field rules, webhook compatibility, and error matrix.
:::

:::note[What success looks like]
You should receive `ok: true` and `stored: true`. If not, compare your payload fields and auth header against the examples above.
:::

## Notes

- URL fields are optional for third-party notifications.
- Public endpoint does not send emails.
- If body is empty, app shows structured table only.
- Requests with no meaningful payload fields return `400`.
- If your key has `allowed_domains`, ensure your request includes a matching `Origin` or `Referer`.

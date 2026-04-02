---
title: Quick Start
description: Send your first third-party notification in under 2 minutes.
---

## 1. Pick your auth header

Use one of the following:

- `Authorization: Bearer wpnotif_...` (recommended)
- `X-API-Key: wpnotif_...`
- `X-WPNOTIF-Key: wpnotif_...`

## 2. Send a test request

```bash
curl -X POST "https://public-api.notificator-project.com/.netlify/functions/public-notify" \
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

- Swagger UI: `https://public-api.notificator-project.com/`
- OpenAPI JSON: `https://public-api.notificator-project.com/.netlify/functions/public-notify?format=openapi`

## Notes

- URL fields are optional for third-party notifications.
- Public endpoint does not send emails.
- If body is empty, app shows structured table only.

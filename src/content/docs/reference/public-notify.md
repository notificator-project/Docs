---
title: Public Notify API
description: Endpoint reference for external notification ingestion.
---

## Base endpoint

`POST https://public-api.notificator-project.com/.netlify/functions/public-notify`

## Methods

- `POST` send external notification
- `GET` function metadata (or OpenAPI with query flag)
- `OPTIONS` CORS preflight

## Authentication

Provide one of:

- `Authorization: Bearer wpnotif_...`
- `X-API-Key: wpnotif_...`
- `X-WPNOTIF-Key: wpnotif_...`

Key type policy:

- Accepted: `public_client`, `internal_service`
- Rejected: `wordpress_server`

## OpenAPI document

`GET https://public-api.notificator-project.com/.netlify/functions/public-notify?format=openapi`

## Request fields

Core:

- `title` string
- `body` string (optional)
- `source` string
- `category` enum: `info`, `task`, `promo`
- `severity` enum: `info`, `warning`, `error`, `critical`

Delivery control:

- `sendPush` boolean (default `true`)
- `sendMqtt` boolean (default `true`)
- `deviceId` string (optional single target)

Data payload:

- `payload` object (preferred metadata block)
- `data` object
- additional top-level keys are merged into `data`

## Webhook compatibility

`public-notify` accepts common webhook request formats out of the box:

- `application/json`
- `application/x-www-form-urlencoded`
- `text/plain`

Normalization behavior:

- `subject` -> `title`
- `description` or `text` -> `body`
- `service` -> `source`
- `payload` / `data` are auto-parsed when sent as JSON strings

### Example: JSON webhook

```bash
curl -X POST "https://public-api.notificator-project.com/.netlify/functions/public-notify" \
  -H "Authorization: Bearer wpnotif_YOUR_PUBLIC_CLIENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Build Failed",
    "description": "CI pipeline failed on deploy.",
    "service": "github_actions",
    "severity": "error",
    "payload": { "workflow": "deploy.yml", "branch": "main" }
  }'
```

### Example: Form-encoded webhook

```bash
curl -X POST "https://public-api.notificator-project.com/.netlify/functions/public-notify" \
  -H "Authorization: Bearer wpnotif_YOUR_PUBLIC_CLIENT_KEY" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "subject=Disk Space Alert" \
  --data-urlencode "description=Node reached 92% disk usage" \
  --data-urlencode "service=infra_monitor" \
  --data-urlencode "payload={\"host\":\"api-1\",\"disk\":92}"
```

### Example: Plain-text webhook

```bash
curl -X POST "https://public-api.notificator-project.com/.netlify/functions/public-notify" \
  -H "Authorization: Bearer wpnotif_YOUR_PUBLIC_CLIENT_KEY" \
  -H "Content-Type: text/plain" \
  --data "Payment provider timeout on checkout"
```

## Successful response

```json
{
  "ok": true,
  "kind": "external_notification",
  "stored": true,
  "payloadPreview": {
    "type": "external_notification",
    "title": "Queue Backlog High",
    "body": "Order queue is above threshold.",
    "source": "erp_worker",
    "category": "task",
    "severity": "warning",
    "dataKeys": ["queue", "pending", "cluster"]
  },
  "pushSent": true,
  "pushAttempted": 1,
  "pushEnabled": true,
  "emailEnabled": false,
  "mqttPublishedCount": 1,
  "mqttSkipped": false,
  "mqttEnabled": true,
  "timestamp": "2026-03-29T12:00:00.000Z"
}
```

## Error responses

- `400` invalid JSON
- `401` invalid/missing key, wrong key type, or policy restriction
- `404` `deviceId` not found
- `409` device inactive/paused
- `502` MQTT publish failed

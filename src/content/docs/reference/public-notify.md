---
title: Public Notify API
description: Endpoint reference for external notification ingestion.
---

## Base endpoint

`POST https://api.notificator-project.com`

:::tip[Canonical URL]
Use `https://api.notificator-project.com` as the default public endpoint for integrations and examples.
:::

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

Origin/domain policy:

- If a key has `allowed_domains`, incoming `Origin`/`Referer` host must match one of them.
- Requests without `Origin`/`Referer` are allowed (common for server-to-server calls).
- `localhost` and `127.0.0.1` are allowed for local testing.

## OpenAPI document

`GET https://api.notificator-project.com?format=openapi`

## Request fields

Core:

- `title` string
- `body` string (optional)
- `source` string (optional, defaults to `third_party`)
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

Minimum payload rule:

- The request must include at least one meaningful notification field.
- Accepted examples: `title`, `body`, `message`, `category`, `severity`, or non-empty `payload`/`data`.
- Empty bodies (or bodies with only control flags like `sendPush`) return `400`.

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
- `category` and `severity` are resolved from top-level, then `payload`, then `data`

### Example: JSON webhook

```bash
curl -X POST "https://api.notificator-project.com" \
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
curl -X POST "https://api.notificator-project.com" \
  -H "Authorization: Bearer wpnotif_YOUR_PUBLIC_CLIENT_KEY" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "subject=Disk Space Alert" \
  --data-urlencode "description=Node reached 92% disk usage" \
  --data-urlencode "service=infra_monitor" \
  --data-urlencode "payload={\"host\":\"api-1\",\"disk\":92}"
```

### Example: Plain-text webhook

```bash
curl -X POST "https://api.notificator-project.com" \
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

:::caution[Fast 401 checklist]
If you receive `401`, check key type first (`public_client` or `internal_service` only), then verify the auth header name and value.
:::

- `400` invalid request body or empty payload (no meaningful notification fields)
- `401` missing auth (`Authorization required`)
- `401` invalid API key (`Invalid API key`)
- `401` disallowed key type (`API key type not allowed for this endpoint...`)
- `401` domain restriction failure (`Origin is not allowed for this API key`)
- `401` temporary auth backend issue (`Authentication service unavailable`)
- `404` `deviceId` not found
- `409` device inactive/paused
- `502` MQTT publish failed

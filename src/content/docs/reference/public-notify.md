---
title: Public Notify API
description: Endpoint reference for external notification ingestion.
---

## Endpoint Summary

- Base URL: `https://api.notificator-project.com`
- Resource: `/` on the public API domain
- Primary method: `POST`

Supported methods:

- `POST` create and dispatch an external notification
- `GET` return endpoint metadata (or OpenAPI with `?format=openapi`)
- `OPTIONS` CORS preflight

OpenAPI document:

- `GET https://api.notificator-project.com?format=openapi`

## Authentication

Provide exactly one API key using any of these headers:

- `Authorization: Bearer wpnotif_...`
- `X-API-Key: wpnotif_...`
- `X-WPNOTIF-Key: wpnotif_...`

Key type policy:

- Allowed: `public_client`, `internal_service`
- Rejected: `wordpress_server`

Domain policy:

- If a key has `allowed_domains`, request `Origin` or `Referer` host must match.
- Requests without `Origin` or `Referer` are accepted for server-to-server traffic.
- `localhost` and `127.0.0.1` are always accepted for local testing.

## Request Contract

Content types accepted:

- `application/json`
- `application/x-www-form-urlencoded`
- `text/plain`

Minimum payload requirement:

- A request must include at least one meaningful notification field.
- Valid examples: `title`, `body`, `message`, `category`, `severity`, non-empty `payload`, or non-empty `data`.
- Requests that only include control flags (for example only `sendPush`) return `400`.

### Request fields

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | No | `External Notification` | Trimmed to 140 chars. |
| `body` | string | No | `""` | Trimmed to 2000 chars. |
| `source` | string | No | `third_party` | Trimmed to 200 chars. |
| `category` | string | No | `info` | Normalized to `info`, `task`, `promo`. |
| `severity` | string | No | `null` | Normalized to `info`, `warning`, `error`, `critical` or omitted. |
| `sendPush` | boolean | No | `true` | Controls Expo push send attempt. |
| `sendMqtt` | boolean | No | `true` | Controls MQTT publish step. |
| `deviceId` | string | No | all active devices | Sends MQTT only to one device when provided. |
| `mqttQos` | number | No | `1` | Valid values: `0`, `1`, `2`. |
| `payload` | object | No | `{}` | Preferred metadata object merged into downstream `data`. |
| `data` | object | No | `{}` | Additional metadata object merged into downstream `data`. |

Any additional top-level fields are preserved and merged into internal `data`.

## Normalization Rules

Incoming payloads are normalized for common webhook formats:

- `subject` -> `title`
- `description` or `text` -> `body`
- `service` -> `source`
- JSON string values in `payload` and `data` are auto-parsed into objects
- `category` and `severity` resolution precedence: top-level -> `payload` -> `data`

## Example Requests

### JSON webhook

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

### Form-encoded webhook

```bash
curl -X POST "https://api.notificator-project.com" \
  -H "Authorization: Bearer wpnotif_YOUR_PUBLIC_CLIENT_KEY" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "subject=Disk Space Alert" \
  --data-urlencode "description=Node reached 92% disk usage" \
  --data-urlencode "service=infra_monitor" \
  --data-urlencode "payload={\"host\":\"api-1\",\"disk\":92}"
```

### Plain-text webhook

```bash
curl -X POST "https://api.notificator-project.com" \
  -H "Authorization: Bearer wpnotif_YOUR_PUBLIC_CLIENT_KEY" \
  -H "Content-Type: text/plain" \
  --data "Payment provider timeout on checkout"
```

## Success Response

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

### Success fields

| Field | Type | Description |
| --- | --- | --- |
| `ok` | boolean | `true` when request was processed. |
| `kind` | string | Always `external_notification`. |
| `stored` | boolean | Whether encrypted notification was stored. |
| `storeReason` | string | Included when `stored` is `false`. |
| `payloadPreview` | object | Sanitized preview of normalized payload. |
| `pushSent` | boolean | At least one push token succeeded. |
| `pushAttempted` | number | Number of push tokens attempted. |
| `pushEnabled` | boolean | Reflects request-level `sendPush`. |
| `emailEnabled` | boolean | Always `false` for this endpoint. |
| `mqttPublishedCount` | number | Number of MQTT publishes completed. |
| `mqttSkipped` | boolean | `true` when no active MQTT targets were available. |
| `mqttSkipReason` | string | Included when MQTT was skipped. |
| `mqttEnabled` | boolean | Reflects request-level `sendMqtt`. |
| `timestamp` | string | Server timestamp in ISO-8601 format. |

## Error Responses

:::caution[401 quick checklist]
For `401`, verify header name, key value, key type (`public_client` or `internal_service`), and domain policy.
:::

| HTTP | Example error | Meaning |
| --- | --- | --- |
| `400` | `Invalid request body` | Body could not be parsed. |
| `400` | `Request payload is empty` | No meaningful notification fields were provided. |
| `401` | `Authorization required` | No auth header/key supplied. |
| `401` | `Invalid API key` | Key missing, revoked, or unknown. |
| `401` | `API key type not allowed for this endpoint...` | Key type is not `public_client` or `internal_service`. |
| `401` | `Origin is not allowed for this API key` | Domain policy denied request. |
| `401` | `Authentication service unavailable` | Backend key validation service not configured/available. |
| `404` | `Device not found for user` | Provided `deviceId` does not belong to key owner. |
| `409` | `Device is inactive or paused` | Target device exists but is not publishable. |
| `502` | `MQTT publish failed` | MQTT delivery failed for selected targets. |

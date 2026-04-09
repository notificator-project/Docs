---
title: Code Samples
description: Ready-to-use examples for JavaScript, TypeScript, PHP, and Postman.
---

Use a `public_client` API key for the `public-notify` endpoint shown below.

`wordpress_server` keys are for `wpnotif-api` and will be rejected here.

:::tip[Production endpoint]
Use `https://api.notificator-project.com` as the canonical public endpoint in all samples.
:::

## JavaScript (fetch)

```js
const endpoint = "https://api.notificator-project.com";
const apiKey = process.env.WPNOTIF_API_KEY;

const payload = {
  title: "Build Succeeded",
  body: "CI pipeline completed successfully.",
  source: "github_actions",
  serviceName: "GitHub Actions",
  eventName: "BuildSucceeded",
  category: "info",
  severity: "info",
  data: {
    workflow: "deploy.yml",
    branch: "main"
  }
};

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload),
});

console.log(response.status, await response.json());
```

## TypeScript

```ts
type PublicNotifyPayload = {
  title: string;
  body?: string;
  source?: string;
  category?: "info" | "task" | "promo";
  severity?: "info" | "warning" | "error" | "critical";
  serviceName?: string;
  eventName?: string;
  data?: Record<string, unknown>;
};

export async function sendPublicNotify(payload: PublicNotifyPayload) {
  const endpoint = "https://api.notificator-project.com";
  const apiKey = process.env.WPNOTIF_API_KEY;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(result));
  return result;
}
```

## PHP (cURL)

```php
<?php
$endpoint = 'https://api.notificator-project.com';
$apiKey = 'wpnotif_YOUR_API_KEY';

$payload = [
  'title' => 'Payment Provider Down',
  'body' => 'Checkout API is returning 503 errors.',
  'source' => 'wordpress_plugin',
  'serviceName' => 'Checkout Worker',
  'eventName' => 'ProviderDown',
  'category' => 'task',
  'severity' => 'critical',
  'data' => [
    'provider' => 'Stripe',
    'region' => 'eu-west-1',
  ],
];

$ch = curl_init($endpoint);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 15,
]);

$responseBody = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP $httpCode\n";
echo $responseBody . "\n";
```

## Postman

- Method: `POST`
- URL: `https://api.notificator-project.com`

:::note[Tip for shared configs]
Store the endpoint in an environment variable and reuse it across services to avoid drift between environments.
:::
- Headers:
  - `Authorization: Bearer {{wpnotif_api_key}}`
  - `Content-Type: application/json`

Body (raw JSON):

```json
{
  "title": "Postman Push Test",
  "body": "This should send push + MQTT.",
  "source": "postman_manual",
  "sendPush": true,
  "sendMqtt": true,
  "service": "billing",
  "region": "eu-west-1"
}
```

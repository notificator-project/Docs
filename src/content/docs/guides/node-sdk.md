---
title: Node.js SDK
description: Install the official Node.js client and send server-side alerts through the hosted Notificator API.
---

`@notificator-project/api` is the official server-side client for Node.js,
serverless functions, queue workers, and backend services. It sends alerts to
the hosted Notificator API without exposing platform delivery credentials to
your application.

The current release is `0.1.0` and requires Node.js 20 or newer.

## Before you begin

Create a `public_client` API key in the Notificator mobile app and store it in a
server environment variable:

```dotenv
NOTIFICATOR_API_KEY=wpnotif_your_key
```

Never include this key in browser JavaScript, a public mobile bundle, source
control, or application logs.

## Install

```bash
npm install @notificator-project/api
```

## Create a client

```js
import { NotificatorClient } from "@notificator-project/api";

const notificator = new NotificatorClient({
  apiKey: process.env.NOTIFICATOR_API_KEY,
});
```

The SDK always uses `https://api.notificator-project.com`. Expo, Supabase,
email-provider, and platform MQTT credentials remain inside the hosted service.

## Send an alert

```js
const result = await notificator.notify({
  title: "Deployment complete",
  body: "Version 2.4.1 is live.",
  source: "deploy-worker",
  category: "info",
  severity: "info",
  data: {
    version: "2.4.1",
    environment: "production",
  },
});

console.log(result.stored, result.pushSent);
```

Every accepted alert can be stored in the Notificator inbox. Mobile push,
account email, and MQTT delivery depend on the request controls, account
preferences, active devices, and configured user-owned broker connection.

## Choose delivery controls

```js
await notificator.notify({
  title: "Queue needs attention",
  body: "The order queue exceeded its threshold.",
  severity: "warning",
  sendPush: true,
  sendEmail: true,
  sendMqtt: true,
  deviceId: "optional-owned-device-id",
});
```

Omit `deviceId` to target all eligible active devices. Email follows the
account preference unless `sendEmail` is explicitly supplied.

## Handle API errors

```js
import {
  NotificatorApiError,
  NotificatorClient,
} from "@notificator-project/api";

try {
  await notificator.notify({ title: "Background job failed" });
} catch (error) {
  if (error instanceof NotificatorApiError) {
    console.error(error.status, error.code, error.message);
  } else {
    throw error;
  }
}
```

The client distinguishes API responses, network failures, request timeouts,
and caller cancellation through structured `NotificatorApiError` values.

## Timeouts and cancellation

Set a client timeout when constructing the SDK:

```js
const notificator = new NotificatorClient({
  apiKey: process.env.NOTIFICATOR_API_KEY,
  timeoutMs: 5000,
});
```

Pass an `AbortSignal` for request-specific cancellation:

```js
const controller = new AbortController();

await notificator.notify(
  { title: "Cancelable alert" },
  { signal: controller.signal },
);
```

## Useful links

- [Node SDK release](https://github.com/notificator-project/Node-SDK/releases/tag/v0.1.0)
- [npm package](https://www.npmjs.com/package/@notificator-project/api)
- [Public Notify API reference](/reference/public-notify/)
- [Create an API key](/guides/mobile-api-key-creation/)

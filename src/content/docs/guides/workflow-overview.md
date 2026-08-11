---
title: Complete Workflow
description: End-to-end setup for WordPress or Strapi, connected delivery, app configuration, and devices.
---

This guide connects all setup pieces in the recommended order.

:::tip[Audience]
This page is optimized for operational setup. If you need direct API testing and payload examples, use [Quick Start](/guides/quick-start/) in the Developer Guide.
:::

## Step 1: Choose the source integration

Use the integration that owns the events you want to watch.

### WordPress

Install Notificator and open **Notificator → Overview**.

- Scan active plugins to discover events.
- Apply a template or create a notification from a discovered event.
- Leave **Dashboard** enabled as the delivery channel.

No Notificator account or API key is needed for dashboard notifications. Continue with [WordPress Plugin Setup](/guides/wordpress-plugin-setup/).

### Strapi

Install `@notificator-project/strapi-extension`, register it in
`config/plugins.ts`, and open **Notificator** in Strapi admin.

- Create rules for application content types.
- Choose created, updated, published, unpublished, or deleted.
- Enable **Strapi activity log** for local delivery.

No Notificator account or API key is needed for the local Strapi activity feed.
Continue with [Strapi Extension Setup](/guides/strapi-extension-setup/).

## Step 2: Verify local delivery

Trigger the event and check the integration's activity view. WordPress dashboard
events can show a wp-admin toast. Strapi rules with **Strapi activity log** keep
the newest 100 matches locally and can show a Strapi admin toast.

In WordPress, each notification has a Dashboard toggle, while Settings provides
global toast controls, conditions, and throttling. In Strapi, enable the local
activity choice on each rule; the extension checks for new local toast activity
while the admin panel is open.

## Step 3: Connect remote delivery (optional)

Create an account and server API key only if you want the Notificator inbox,
mobile push, email, or MQTT.

- Sign in to the mobile app.
- Create a `WordPress` (`wordpress_server`) API key. The current WordPress and
  Strapi integrations both use this signed server key type.
- In WordPress, add and enable the key under **Notificator → Settings → Remote delivery**.
- In Strapi, store it as `NOTIFICATOR_API_KEY` and restart the server.
- Enable the remote channels required by each notification or rule.

Continue with [Create API Key (Mobile)](/guides/mobile-api-key-creation/).

MQTT also requires your own HiveMQ Cloud cluster. Notificator does not provide a
default broker. Configure the same cluster and topic prefix in WordPress or
Strapi and on the device by following [MQTT Broker Setup](/guides/mqtt-broker-setup/).

:::caution[Key type matters]
Use `wordpress_server` for the WordPress plugin.
The current Strapi extension also uses `wordpress_server` for its signed server flow.
Use `public_client` for the `public-notify` endpoint.
:::

## Step 4: Add plugin templates and hook integrations

If you are a plugin/theme developer and want deeper integration:

- Create reusable scenario templates that appear in Notificator UI.
- Register custom events with accurate descriptions and payload field names.
- Emit normal WordPress actions and let administrators choose their delivery channels.

Continue with:

- [Plugin Template Creation](/guides/plugin-template-creation/)
- [WordPress Custom Events](/guides/wordpress-custom-events/)

## Step 5: Configure app settings

Tune notifications, security, and home widgets from mobile settings.

- Enable push for current device.
- Review notification preferences.
- Configure 2FA and visibility options.

Continue with [App Settings Guide](/guides/app-settings/).

## Step 6: Configure a Notificator device (optional)

If you use a physical Notificator device:

- Choose Base or Touch when adding the device in the mobile app.
- Set idle theme (Clock, Weather, or Weather & Clock).
- Configure weather location/timezone as needed.
- Adjust the model's supported display and sound controls.

Continue with [Notificator Base Setup](/guides/notificator-base-setup/) or
[Notificator Touch Setup](/guides/notificator-touch-setup/).

## Step 7: Validate external API flow

Use OpenAPI and samples to test your public-notify payloads.

:::note[Optional developer validation]
This final step is optional for no-code-only users and intended for teams validating external integrations.
:::

- Use a `Public API` key (`public_client`) for `public-notify` requests.

- [Quick Start](/guides/quick-start/)
- [Code Samples](/guides/code-samples/)
- [Public Notify API](/reference/public-notify/)

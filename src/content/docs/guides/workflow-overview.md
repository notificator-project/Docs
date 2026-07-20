---
title: Complete Workflow
description: End-to-end setup from account creation to WordPress integration and app configuration.
---

This guide connects all setup pieces in the recommended order.

:::tip[Audience]
This page is optimized for operational setup. If you need direct API testing and payload examples, use [Quick Start](/guides/quick-start/) in the Developer Guide.
:::

## Step 1: Install the WordPress plugin

Install Notificator Companion and open **Notificator Companion → Overview**.

- Scan active plugins to discover events.
- Apply a template or create a notification from a discovered event.
- Leave **Dashboard** enabled as the delivery channel.

No Notificator account or API key is needed for dashboard notifications. Continue with [WordPress Plugin Setup](/guides/wordpress-plugin-setup/).

## Step 2: Verify dashboard delivery

Trigger the event and check **Notificator Companion → Activity**. Dashboard-only events appear as delivered and can show a toast in wp-admin.

- Each notification has its own Dashboard toggle.
- Settings also contains a global dashboard-toast switch and presentation controls.
- Use event conditions and throttling to reduce noise.

## Step 3: Connect remote delivery (optional)

Create an account and WordPress API key only if you want mobile push or MQTT.

- Sign in to the mobile app.
- Create a `WordPress` (`wordpress_server`) API key.
- Add and enable that key under **Notificator Companion → Settings → Remote delivery**.
- Edit an event and enable **Mobile push**, **MQTT**, or both.

Continue with [Create API Key (Mobile)](/guides/mobile-api-key-creation/).

:::caution[Key type matters]
Use `wordpress_server` for the WordPress plugin.
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

## Step 5b: Configure Early Access device (optional)

If you use the physical Early Access ESP32 device:

- Add the device in mobile app Devices.
- Set idle theme (Clock, Weather, or Weather & Clock).
- Configure weather location/timezone as needed.

Continue with [Early Access Device Setup](/guides/early-access-device-setup/).

## Step 6: Validate external API flow

Use OpenAPI and samples to test your public-notify payloads.

:::note[Optional developer validation]
This final step is optional for no-code-only users and intended for teams validating external integrations.
:::

- Use a `Public API` key (`public_client`) for `public-notify` requests.

- [Quick Start](/guides/quick-start/)
- [Code Samples](/guides/code-samples/)
- [Public Notify API](/reference/public-notify/)

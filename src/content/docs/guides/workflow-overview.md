---
title: Complete Workflow
description: End-to-end setup from account creation to WordPress integration and app configuration.
---

This guide connects all setup pieces in the recommended order.

## Step 1: Create your account

Start in the mobile app and sign up/sign in with your email account.

- Open the app and complete authentication.
- Confirm your session is active.
- Open the Settings/Profile tab.

Continue with [Create Account](/guides/account-creation/).

## Step 2: Create an API key in mobile

Create a dedicated API key for your WordPress/plugin integration.

- Go to Profile -> API Keys.
- Create a named key (for example: `wordpress-prod`).
- Choose type `WordPress` (`wordpress_server`).
- Copy and store the key securely.

If you also use the public endpoint, create a second key with type `Public API` (`public_client`).

Continue with [Create API Key (Mobile)](/guides/mobile-api-key-creation/).

## Step 3: Configure WordPress plugin

Install and configure the plugin with your function endpoint and API key.

- Set function URL to your deployed `wpnotif-api` endpoint.
- Paste a `WordPress` key (`wordpress_server`).
- Add monitors and run a test notification.

Continue with [WordPress Plugin Setup](/guides/wordpress-plugin-setup/).

## Step 4: Add plugin templates and hook integrations

If you are a plugin/theme developer and want deeper integration:

- Create reusable scenario templates that appear in Notificator UI.
- Emit hooks from your plugin and let Notificator send notifications when they fire.

Continue with:

- [Plugin Template Creation](/guides/plugin-template-creation/)
- [Plugin Hooks Notifications](/guides/plugin-hooks-notifications/)

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

- Use a `Public API` key (`public_client`) for `public-notify` requests.

- [Quick Start](/guides/quick-start/)
- [Code Samples](/guides/code-samples/)
- [Public Notify API](/reference/public-notify/)

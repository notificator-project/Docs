---
title: WordPress Plugin Setup
description: Configure the WordPress plugin with your endpoint, API key, and monitors.
---

## Install plugin

1. Upload plugin files to your WordPress plugins directory.
2. Activate the plugin from WordPress Admin.
3. Open Settings -> Uptime Monitor.

## Configure connection

Fill these fields in plugin settings:

- API Key: your `wpnotif_...` key of type `WordPress` (`wordpress_server`)
- Monitoring Function URL: your deployed function URL

Example function URL:

`https://public-api.notificator-project.com/.netlify/functions/wpnotif-api`

## Add monitors

In URLs to Monitor:

- Site Name (friendly label)
- URL (full URL)
- Method (HEAD or GET)
- Enabled (on/off)

Save settings.

## Test end-to-end

1. Click Send Test Notification.
2. Open mobile app and verify notification appears.
3. Open details and check payload fields.

The plugin signs requests automatically with timestamp/nonce headers. Keep server-side signature and nonce checks enabled in production.

## Troubleshooting

- Invalid API key: recreate and copy fresh key.
- Key type mismatch: ensure plugin key type is `wordpress_server` (not `public_client`).
- No push in mobile: verify device push is enabled in app settings.
- URL checks failing: test monitor URL manually and try GET method.

## Next step

Tune user preferences in [App Settings Guide](/guides/app-settings/).

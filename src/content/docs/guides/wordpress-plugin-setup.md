---
title: WordPress Plugin Setup
description: Discover WordPress events and create dashboard, mobile push, and MQTT notifications.
---

Notificator works in dashboard-only mode immediately after activation. An API key is optional and is needed only for mobile push and MQTT.

## Install the plugin

1. Download the current installable ZIP from [GitHub Releases](https://github.com/notificator-project/WordPress-Plugin/releases), or install it from WordPress.org when the directory listing is available.
2. In WordPress Admin, go to **Plugins → Add New → Upload Plugin**.
3. Upload the Notificator ZIP, install it, and activate it.
4. Open **Notificator → Overview**.

## Discover site events

1. Select **Scan** from Getting started or open **Settings → Event discovery → Scan active plugins**.
2. Keep **active plugins only** selected for the fastest first scan.
3. When the scan completes, choose **Review discoveries**.
4. Use Recommended first. Search by event, hook, or plugin when needed.

Discovery explains events in plain language and marks noisy, dynamic, registration-only, and observed candidates. Dynamic patterns cannot be selected until they resolve to an exact WordPress hook.

The per-plugin event limit in Settings applies separately to each plugin, so the total number found can be much higher. Scans run in bounded background batches, reuse unchanged results, and keep the previous discovery snapshot available until the new scan completes.

## Create a notification

You can start from:

- **Created notifications** — manage existing rules.
- **Templates** — apply a ready-made configuration.
- **Discover events** — create a rule from a scanned or explicitly registered event.

In the create modal:

1. Choose the source plugin and event.
2. Give the notification a clear name and priority.
3. Optionally add notes, placeholders, and conditions.
4. Select at least one delivery channel.

### Delivery channels

| Channel     | API key required? | Result                                                          |
| ----------- | ----------------- | --------------------------------------------------------------- |
| Dashboard   | No                | Records the event in Activity and can display a wp-admin toast. |
| Mobile push | Yes               | Sends a notification to connected phones.                       |
| MQTT        | Yes               | Publishes to connected IoT devices.                             |

Dashboard is enabled by default. Mobile push and MQTT remain unavailable until at least one saved API key is enabled.

## Connect mobile push or MQTT (optional)

1. Create a `WordPress` (`wordpress_server`) key in the mobile app.
2. Open **Notificator → Settings**.
3. Add the key under **Remote delivery**, optionally give it a nickname, and save.
4. Use **Test** on that key.
5. Edit a notification and enable Mobile push, MQTT, or both.

You can store several API keys and switch each one on or off. If every key is off, the plugin returns to dashboard-only delivery without disabling event setup.

## Review Activity

Activity shows the event, time, priority, destination, and delivery state. Use search and filters to isolate delivered, throttled, paused, or failed events. Dashboard-only delivery is shown separately from remote delivery.

## Tune plugin behavior

Under **Settings** you can:

- enable or disable dashboard toasts globally;
- change toast duration, position, and dismissal behavior;
- set event throttling;
- change the maximum hooks scanned per plugin;
- export or clear Activity;
- reset plugin test data while preserving API keys.

Use the **Tools** button in the header only to export or import notification configurations. API keys are never included in exports. After importing on another site, review plugin availability, event names, placeholders, conditions, keys, and delivery channels before enabling the notifications.

Deleting the plugin through WordPress removes its settings, notifications, logs, scan caches, scheduled jobs, and user toast metadata. Deactivation alone keeps the configuration.

## Troubleshooting

### Scan appears stuck

- Wait for the progress modal; background scans use WP-Cron.
- Confirm WordPress loopback requests and WP-Cron are working.
- Try active plugins only or reduce the scan limit.
- An API key is not required to scan.

### Dashboard alert is missing

- Confirm the event and its Dashboard channel are enabled.
- Check the global dashboard-toast setting.
- Trigger the exact event and inspect Activity.
- Conditions and throttling can intentionally suppress delivery.

### Push or MQTT is unavailable

- Add a WordPress API key and save it.
- Ensure at least one key is switched on.
- Test the key from its Settings row.
- For mobile push, confirm notifications are enabled for the device.

## Next steps

- [Complete Workflow](/guides/workflow-overview/)
- [App Settings Guide](/guides/app-settings/)
- [WordPress Custom Events](/guides/wordpress-custom-events/)

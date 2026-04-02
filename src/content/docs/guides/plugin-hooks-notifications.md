---
title: Plugin Hooks Notifications
description: Use WordPress hooks so Notificator can send notifications when plugin events occur.
---

This guide shows how to emit hooks from your plugin and let Notificator Companion turn those events into push/MQTT notifications.

## How it works

1. Your plugin emits a WordPress action/filter hook.
2. Notificator Companion listens to configured hook names.
3. On trigger, it builds payload and sends notification.

## Emit a custom action hook

In your plugin code:

```php
<?php
// Example event: after custom order is created.
do_action('my_plugin_order_created', $order_id, $user_id, $amount);
```

Then in Notificator Companion UI:

- Add scenario with `hook_name`: `my_plugin_order_created`
- Set scenario name/notes
- Enable send push / send mqtt as needed

## Emit with wrapper functions

The scanner supports prefixed wrappers too (for example `gf_do_action`).

```php
<?php
gf_do_action('my_plugin_sync_completed', $job_id, $duration_ms);
```

## Filter-based events

Filter hooks can be used as trigger sources as well.

```php
<?php
$value = apply_filters('my_plugin_before_export', $value, $context);
```

## Conditions and payload tips

When defining scenario conditions:

- Use stable argument order in your hook calls.
- Keep argument types predictable (number/string).
- Use descriptive scenario names for easier triage.

Example condition target:

- field: `user_id`
- operator: `>=`
- value: `1`

## Recommended production safeguards

- Keep hook names unique and namespaced (`my_plugin_*`).
- Use Notificator throttle settings to avoid noisy bursts.
- Test each scenario with controlled sample events first.

## Troubleshooting

No notifications on hook trigger:

1. Confirm scenario is enabled.
2. Confirm exact hook name match.
3. Re-run plugin hook scan in Notificator admin.
4. Check plugin log entries and Netlify/API logs.
5. Verify API key and endpoint settings.

## Related

- [Plugin Template Creation](/guides/plugin-template-creation/)
- [Public Notify API](/reference/public-notify/)
- [Copy-Paste Snippets](/guides/copy-paste-snippets/)

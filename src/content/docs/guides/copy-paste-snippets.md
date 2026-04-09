---
title: Copy-Paste Snippets
description: One-page snippet appendix for plugin integration, hooks, templates, and API calls.
---

Use this page as a quick snippet bank during implementation.

## Register a plugin template

```php
<?php
add_action('notificator_companion_register_templates', function () {
    if (!function_exists('notificator_companion_register_template')) {
        return;
    }

    notificator_companion_register_template(array(
        'icon' => 'dashicons-admin-generic',
        'title' => 'My Plugin: Event',
        'hook_name' => 'my_plugin_event',
        'description' => 'Fires when my plugin event runs',
        'scenario_name' => 'My Plugin Event',
        'required_plugin' => 'my-plugin-slug',
        'hook_meta' => array(
            'label' => 'My plugin event',
            'type' => 'action',
            'arg_names' => array('user_id'),
            'payload_arity' => 1,
        ),
    ));
});
```

## Whitelist custom plugin slug for template visibility

```php
<?php
add_filter('notificator_companion_active_plugin_identifiers', function ($ids) {
    $ids[] = 'my-plugin-slug';
    return $ids;
});
```

## Emit a hook from your plugin

```php
<?php
do_action('my_plugin_order_created', $order_id, $user_id, $amount);
```

## Emit a filter-based event

```php
<?php
$value = apply_filters('my_plugin_before_export', $value, $context);
```

## Trigger monitoring check programmatically

```php
<?php
$monitor = UptimeMonitor::get_instance();
$result = $monitor->send_monitoring_check();

if ($result) {
    echo 'Monitoring check sent successfully';
}
```

## Public notify request (cURL)

```bash
curl -X POST "https://api.notificator-project.com" \
  -H "Authorization: Bearer wpnotif_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Queue Backlog High",
    "body": "Order queue is above threshold.",
    "source": "erp_worker",
    "serviceName": "ERP Worker",
    "eventName": "QueueBacklogHigh",
    "category": "task",
    "severity": "warning"
  }'
```

## WordPress request headers (signed)

```php
<?php
$timestamp = (string) (int) round(microtime(true) * 1000);
$signature = hash_hmac('sha256', $timestamp . $body, $api_key);

$headers = array(
    'Authorization' => 'Bearer ' . $api_key,
    'Content-Type'  => 'application/json',
    'Origin'        => rtrim(home_url(), '/'),
    'Referer'       => rtrim(home_url(), '/') . '/',
    'X-Timestamp'   => $timestamp,
    'X-Signature'   => $signature,
);
```

## Related guides

- [Plugin Template Creation](/guides/plugin-template-creation/)
- [Plugin Hooks Notifications](/guides/plugin-hooks-notifications/)
- [Code Samples](/guides/code-samples/)
- [Public Notify API](/reference/public-notify/)

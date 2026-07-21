---
title: Plugin Template Creation
description: Register reusable Notificator scenario templates from your plugin or theme.
---

This guide is for plugin and theme developers who want ready-made notification templates to appear inside Notificator. Register the underlying event as well when you want accurate, scan-free discovery.

## What a template gives you

A template pre-fills scenario settings in the admin UI:

- `hook_name`
- `description`
- `scenario_name`
- optional `hook_meta`
- optional prefilled `conditions`

:::note[Event registration vs. templates]
An [event registration](/guides/wordpress-custom-events/) describes what your plugin emits and makes it visible in Discover; it does not create a notification. A template recommends how an administrator might use that event; it becomes a notification only after the user applies and saves it. Integrations can provide either or both, but providing both gives the best experience.
:::

## Minimal registration example

Add this in your plugin/theme bootstrap:

```php
<?php
add_action('notificator_companion_register_templates', function () {
    if (!function_exists('notificator_companion_register_template')) {
        return;
    }

    notificator_companion_register_template(array(
        'icon' => 'dashicons-admin-generic',
        'title' => 'My Plugin: Something Happened',
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
        'conditions' => array(
            array(
                'field' => 'user_id',
                'operator' => '>=',
                'value' => '1',
                'value_type' => 'number',
                'value_label' => 'User ID at/above',
                'value_placeholder' => '1',
                'locked' => true,
                'lock_field' => true,
                'lock_operator' => true,
            ),
        ),
    ));
});
```

## Make your custom slug visible

If you also [register an event](/guides/wordpress-custom-events/) with the same `plugin_slug`, Notificator automatically treats that template group as active.

For a template-only integration, add a custom `required_plugin` slug to the active identifiers:

```php
add_filter('notificator_companion_active_plugin_identifiers', function ($ids) {
    $ids[] = 'my-plugin-slug';
    return $ids;
});
```

If you do not want custom slug handling, set:

- `required_plugin` => `wordpress-core`

## Template fields reference

- `icon` string: Emoji or Dashicon class.
- `title` string: Card title in template picker.
- `hook_name` string: Target hook.
- `description` string: Short explanation.
- `scenario_name` string: Default scenario name.
- `required_plugin` string: Filtering key.
- `hook_meta` array: Hook metadata (`arg_names`, `payload_arity`, etc.).
- `conditions` array: Prefilled condition rules.

## Verification checklist

1. Activate your plugin and Notificator.
2. Open **Notificator → Notifications → Templates**.
3. Confirm your template appears in its plugin group.
4. Apply template and save scenario.
5. Trigger the hook and verify notification arrives.

## Related

- [Plugin Hooks Notifications](/guides/plugin-hooks-notifications/)
- [WordPress Custom Events](/guides/wordpress-custom-events/)
- [WordPress Plugin Setup](/guides/wordpress-plugin-setup/)
- [Copy-Paste Snippets](/guides/copy-paste-snippets/)

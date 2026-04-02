---
title: Plugin Template Creation
description: Register reusable Notificator scenario templates from your plugin or theme.
---

This guide is for plugin/theme developers who want their own prebuilt scenario templates to appear inside Notificator Companion.

## What a template gives you

A template pre-fills scenario settings in the admin UI:

- `hook_name`
- `description`
- `scenario_name`
- optional `hook_meta`
- optional prefilled `conditions`

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

If you use custom `required_plugin`, add your slug to active identifiers:

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

1. Activate your plugin and Notificator Companion.
2. Open Notificator admin page.
3. Open templates picker and confirm your template appears.
4. Apply template and save scenario.
5. Trigger the hook and verify notification arrives.

## Related

- [Plugin Hooks Notifications](/guides/plugin-hooks-notifications/)
- [WordPress Plugin Setup](/guides/wordpress-plugin-setup/)
- [Copy-Paste Snippets](/guides/copy-paste-snippets/)

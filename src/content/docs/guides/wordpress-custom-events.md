---
title: WordPress Custom Events
description: Register accurate, discoverable Notificator events from a WordPress plugin or theme.
---

Use the event registration API when your plugin already emits meaningful WordPress actions and you want those actions to appear in Notificator without a source scan.

:::tip[What registration does]
Registration documents an event. Your plugin still emits an ordinary WordPress action with `do_action()`, so the event remains useful to every WordPress integration—not only Notificator.
:::

## Registered event vs. template

These features are related, but they do different jobs:

| Feature | What it represents | Where users see it | What it does not do |
| --- | --- | --- | --- |
| Registered event | Something the plugin can emit, including its hook name, description, and payload fields. | **Notifications → Discover events** | It does not create or send a notification by itself. |
| Template | A suggested notification setup for an event, including its name, priority, notes, and conditions. | **Notifications → Templates** | It does not emit or register the underlying event. |

A template becomes a real notification only after an administrator applies and saves it. The strongest integration supplies both: the event tells Notificator **what can happen**, while the template recommends **what the user can do with it**.

## Install the sample plugin

[Download the installable Notificator Companion Sample Plugin](https://raw.githubusercontent.com/vagelisp/netlify-uptime-monitor/main/plugin/examples/notificator-companion-sample-plugin.zip).

1. Download the sample ZIP without extracting it.
2. In WordPress Admin, open **Plugins → Add New → Upload Plugin**.
3. Choose `notificator-companion-sample-plugin.zip`, select **Install Now**, and activate it.
4. Open **Notificator Companion → Support**. Developer integrations should show one detected event and one third-party template.
5. Open **Notifications → Templates** and apply **Sample message notification**.
6. Save it with Dashboard enabled.
7. Open **Notificator Companion → Sample Integration**, trigger the event, and check Activity.

The sample uses a nonce-protected form, provides named `message` and `suffix` arguments, and requires no API key for the Dashboard test.

## Minimal integration

Register event definitions through `notificator_companion_register_events`:

```php
add_action( 'notificator_companion_register_events', function () {
    if ( ! function_exists( 'notificator_companion_register_event' ) ) {
        return;
    }

    notificator_companion_register_event(
        array(
            'hook_name'   => 'acme_order_flagged',
            'label'       => 'Order flagged',
            'description' => 'Runs when Acme flags an order for manual review.',
            'plugin_slug' => 'acme',
            'plugin_name' => 'Acme',
            'plugin_file' => plugin_basename( __FILE__ ),
            'arg_names'   => array( 'order_id', 'reason' ),
        )
    );
} );
```

Emit the action where the business event occurs:

```php
do_action( 'acme_order_flagged', $order_id, $reason );
```

Administrators can now find **Order flagged** in **Notificator Companion → Notifications → Discover events** and create a Dashboard, Mobile push, or MQTT notification.

## Registration fields

| Field | Required | Purpose |
| --- | --- | --- |
| `hook_name` | Yes | Exact action name passed to `do_action()`. |
| `label` | No | Short name shown to administrators. |
| `description` | No | Non-technical explanation of when the event fires. |
| `plugin_slug` | No | Stable slug used to group your events. |
| `plugin_name` | No | Product name displayed in the UI. |
| `plugin_file` | No | Plugin basename used for integration status. |
| `arg_names` | No | Ordered names matching the emitted arguments. |
| `properties` | No | Safe object-property metadata for conditions and placeholders. |

The function returns `true` when accepted. Invalid hook names return `false`. Registering the same `plugin_slug` and `hook_name` again replaces its earlier definition instead of creating a duplicate.

## Argument names and conditions

Argument order must match `do_action()`:

```php
'arg_names' => array( 'order_id', 'reason' )

do_action( 'acme_order_flagged', $order_id, $reason );
```

This lets an administrator build conditions such as:

- `order_id >= 1000`
- `reason contains payment`

Keep published argument order stable. Add new optional arguments at the end.

## Object properties

If an argument is an object, explicitly describe safe getter methods:

```php
'arg_names' => array( 'order' ),
'properties' => array(
    'order' => array(
        array(
            'name'   => 'total',
            'label'  => 'Order total',
            'type'   => 'number',
            'method' => 'get_total',
        ),
    ),
),
```

Notificator can then use `order.total` in a condition or supported placeholder without exposing the entire object.

## Privacy and performance

- Do not emit passwords, tokens, payment details, or unnecessary personal data.
- Prefer IDs, statuses, totals, and short operational values.
- Registration itself performs no network request.
- Raw action arguments are not sent externally.
- Conditions and supported placeholders may read only the fields an administrator selects.
- Use a specific action after a completed outcome rather than a broad hook that fires repeatedly.

## Add a ready-made template

Registration makes an event discoverable but does not create a notification. A template can additionally recommend a useful configuration, priority, notes, and conditions; it is only applied when the administrator chooses it. See [Plugin Template Creation](/guides/plugin-template-creation/).

## Verify the integration

1. Activate your plugin and Notificator Companion 2.3.0 or newer.
2. Open **Support → Developer integrations** and confirm the event count and name.
3. Open **Notifications → Discover events**; no scan is required.
4. Create a Dashboard notification for the event.
5. Emit the action in a controlled test.
6. Confirm **Dashboard delivered** in Activity.
7. Optionally connect an API key and test Mobile push or MQTT.

## Backward compatibility

If Notificator Companion is inactive, the registration callback is harmless and your normal `do_action()` call continues to work. Plugin load order is handled by the registration action.

## Related

- [WordPress Hook Discovery](/guides/plugin-hooks-notifications/)
- [Plugin Template Creation](/guides/plugin-template-creation/)
- [WordPress Plugin Setup](/guides/wordpress-plugin-setup/)

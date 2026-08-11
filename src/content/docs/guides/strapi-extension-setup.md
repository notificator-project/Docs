---
title: Strapi Extension Setup
description: Install Notificator for Strapi, create content-event rules, and configure local or connected alert delivery.
---

Notificator for Strapi turns successful Strapi content operations into readable
alerts. Administrators choose the content type, action, message, severity, and
delivery channels from the Strapi admin panel instead of writing lifecycle code
for every model.

:::caution[Preview release]
The extension is currently an early development preview for Strapi 5. Test it
before using it for important operational workflows, and do not treat its local
activity feed as an immutable audit log.
:::

## What the extension watches

Rules can watch application collection types and single types. Strapi admin,
plugin, and other internal models are intentionally excluded.

| Action            | When the rule runs                           |
| ----------------- | -------------------------------------------- |
| Entry created     | A new document is created successfully       |
| Entry updated     | An existing document is changed successfully |
| Entry published   | A draft is published                         |
| Entry unpublished | Published content returns to draft           |
| Entry deleted     | A document is deleted                        |

Delivery happens after Strapi completes the content operation. A notification
failure is logged but does not roll back content that was already saved.

## Delivery channels

| Channel             | API key required? | Result                                                                    |
| ------------------- | ----------------- | ------------------------------------------------------------------------- |
| Strapi activity log | No                | Keeps up to 100 recent matches locally and can show a Strapi admin toast. |
| Notificator inbox   | Yes               | Stores the accepted alert in the user's Notificator account.             |
| Mobile push         | Yes               | Sends a push through the Notificator mobile app.                          |
| Email               | Yes               | Uses the email-alert preference configured in the mobile app.            |
| MQTT                | Yes               | Sends to compatible devices through the user's HiveMQ Cloud cluster.     |

The Notificator inbox is always included when a rule uses remote delivery.
Push, email, and MQTT are optional additions. The local Strapi activity log is
independent and continues to work when the remote service is disabled or
unavailable.

## Requirements

- Strapi 5.51.2 or newer within the Strapi 5 release line
- A Node.js version supported by the installed Strapi release
- A Notificator server API key for inbox, push, email, or MQTT
- A HiveMQ Cloud cluster only when MQTT delivery is required

New Strapi projects need at least one application content type before a rule
can be created.

## Install the extension

From the Strapi application directory, run:

```bash
npm install @notificator-project/strapi-extension
```

Add the extension to `config/plugins.ts`:

```ts
export default ({ env }) => ({
  notificator: {
    enabled: true,
    config: {
      enabled: env.bool('NOTIFICATOR_ENABLED', true),
      apiKey: env('NOTIFICATOR_API_KEY', ''),
      origin: env('PUBLIC_URL', ''),
      requestTimeoutMs: env.int('NOTIFICATOR_TIMEOUT_MS', 8000),
      mqtt: {
        enabled: env.bool('NOTIFICATOR_MQTT_ENABLED', false),
        host: env('NOTIFICATOR_MQTT_HOST', ''),
        username: env('NOTIFICATOR_MQTT_USERNAME', ''),
        password: env('NOTIFICATOR_MQTT_PASSWORD', ''),
        topicPrefix: env(
          'NOTIFICATOR_MQTT_TOPIC_PREFIX',
          'notificator-project'
        ),
      },
    },
  },
});
```

Restart Strapi after installing the extension or changing environment values.
The **Notificator** entry should then appear in the admin navigation.

## Choose local-only or connected setup

### Local Strapi activity only

No Notificator account, API key, or environment variable is required. Install
the extension, create a rule, enable **Strapi activity log**, and leave its
remote delivery choices off.

The activity feed is stored in Strapi's plugin store and retains the 100 newest
matches. Administrators with the extension's manage permission can clear it.
Admin toasts are checked while the Strapi panel is open and can take up to 15
seconds to appear.

### Inbox, push, email, or MQTT

Create a separate API key for each Strapi environment:

1. Open the Notificator mobile app.
2. Go to **Account → API Keys → Create API Key**.
3. Give the key a name such as `strapi-production`.
4. Select **Strapi Extension** (`strapi_server`). An `internal_service` key is
   also supported; do not use a `public_client` key.
5. Copy the key immediately and store it in the Strapi server environment.

Add the smallest connected configuration to `.env`:

```dotenv
NOTIFICATOR_ENABLED=true
NOTIFICATOR_API_KEY=wpnotif_replace_with_your_key
PUBLIC_URL=https://cms.example.com
```

Never put the API key in browser-side admin code, source control, a container
image, or a public deployment variable.

## Environment-variable reference

| Variable                        | Required                        | Default               | Purpose                                                                               |
| ------------------------------- | ------------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `NOTIFICATOR_ENABLED`           | No                              | `true`                | Enables remote delivery. Local Strapi activity remains available when this is false. |
| `NOTIFICATOR_API_KEY`           | For remote delivery             | Empty                 | Secret server key created in the Notificator mobile app.                              |
| `PUBLIC_URL`                    | Recommended for remote delivery | Empty                 | Public origin of the Strapi application, such as `https://cms.example.com`.           |
| `NOTIFICATOR_TIMEOUT_MS`        | No                              | `8000`                | Remote timeout in milliseconds. Accepted range: `1000` to `30000`.                    |
| `NOTIFICATOR_MQTT_ENABLED`      | No                              | `false`               | Makes the configured HiveMQ connection available to MQTT rules.                       |
| `NOTIFICATOR_MQTT_HOST`         | When MQTT is enabled            | Empty                 | HiveMQ Cloud hostname without protocol, port, or path.                                |
| `NOTIFICATOR_MQTT_USERNAME`     | When MQTT is enabled            | Empty                 | Publisher username created for the HiveMQ Cloud cluster.                              |
| `NOTIFICATOR_MQTT_PASSWORD`     | When MQTT is enabled            | Empty                 | Secret password for that HiveMQ credential.                                           |
| `NOTIFICATOR_MQTT_TOPIC_PREFIX` | When MQTT is enabled            | `notificator-project` | Topic namespace shared with the intended devices.                                     |

Production delivery always uses the official Notificator server endpoint. The
endpoint is controlled by the project and is not a user setting. A development
build can use `NOTIFICATOR_DEV_ENDPOINT` only while `NODE_ENV=development`;
production ignores it.

## Configure MQTT delivery

Notificator does not provide a shared MQTT broker. The current extension
supports a user-owned HiveMQ Cloud cluster.

Add the publisher connection to `.env`:

```dotenv
NOTIFICATOR_MQTT_ENABLED=true
NOTIFICATOR_MQTT_HOST=your-cluster.s1.eu.hivemq.cloud
NOTIFICATOR_MQTT_USERNAME=your-strapi-publisher
NOTIFICATOR_MQTT_PASSWORD=replace-with-your-password
NOTIFICATOR_MQTT_TOPIC_PREFIX=notificator-project
```

Use only the hostname. Secure WebSockets use fixed port `8884` and path `/mqtt`.
The Strapi publisher, mobile app, and target devices must use the same cluster
and topic prefix. Separate publisher and device credentials are recommended.

The MQTT password remains in the Strapi server environment. It is attached to
the signed HTTPS delivery request only when an MQTT rule runs, and the
Notificator API does not persist it in its database. An incomplete MQTT setup
skips MQTT without blocking the inbox, push, email, or local activity.

Continue with [MQTT Broker Setup](/guides/mqtt-broker-setup/) for the HiveMQ
cluster and device steps.

## Confirm the connection

1. Open **Notificator** in Strapi admin.
2. Confirm the API connection says **Configured** when remote delivery is
   required.
3. Select **Test connection**.
4. Check the Notificator inbox and the current phone for the connection test.
5. If MQTT is enabled, confirm its card reports the expected hostname and topic
   prefix.

The connection test is disabled until an API key is available. It tests signed
API and push delivery; it is not required for local-only rules.

## Create a rule

1. Open **Notificator** in the Strapi admin navigation.
2. Find **Add a notification rule** below the connection summary.
3. Enter a private rule name that explains its purpose.
4. Choose an application content type.
5. Choose created, updated, published, unpublished, or deleted.
6. Write the notification title and message.
7. Choose Information, Warning, or Critical severity.
8. Enable **Strapi activity log** and any remote channels you need.
9. Select **Add rule** and ensure the saved rule is enabled.
10. Perform the selected action on a matching entry.

Saving, editing, enabling, disabling, and deleting rules shows a confirmation
or error notice in the editor. Notices dismiss automatically after a short
delay. Removing a rule requires confirmation.

## Use template values

Titles and messages can include safe values from the matching event:

| Template                  | Meaning                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `{{model.displayName}}`   | Human-readable content type name                            |
| `{{model.uid}}`           | Strapi content type UID                                     |
| `{{event.name}}`          | Raw event name, such as `publish`                           |
| `{{event.label}}`         | Readable event text, such as `published`                    |
| `{{entry.title}}`         | Public scalar field named `title`                           |
| `{{entry.documentId}}`    | Strapi document identifier when available                   |
| `{{actor.name}}`          | Name of the user who triggered the operation                |
| `{{actor.email}}`         | Actor email when available                                  |
| `{{actor.username}}`      | Actor username when available                               |
| `{{actor.id}}`            | Actor or API credential identifier                          |
| `{{actor.type}}`          | `admin`, `authenticated`, `api`, `anonymous`, or `system`   |

Other public scalar fields use `{{entry.fieldName}}`, for example
`{{entry.slug}}`, `{{entry.status}}`, or `{{entry.price}}`. Missing values
become an empty string.

Example:

```text
Rule name: Article published
Title: {{model.displayName}} {{event.label}}
Message: {{entry.title}} was published by {{actor.name}}.
```

Relations, components, media, passwords, private attributes, methods, inherited
properties, and other complex values are not available to templates.

## Assign admin permissions

The extension registers two Strapi admin permissions:

- **Read** allows an administrator to open Notificator and view its state.
- **Manage settings** allows rules and local activity to be changed.

Super Admin users have normal unrestricted access. Assign both permissions to a
custom admin role that should manage rules.

## External request and privacy notes

Local-only rules do not contact Notificator. Remote rules send a signed request
to `https://wpnotif.notificator-project.com` after the selected Strapi action
succeeds. The request can contain the notification text, selected channels,
content type, event name, public scalar entry values, timestamp, public Strapi
origin, and MQTT connection details only when MQTT is requested.

API keys and broker credentials are server-only and are never returned through
the extension's admin API. Requests are protected with HMAC-SHA256, a timestamp,
and a unique nonce. Avoid inserting unnecessary personal or sensitive content
into notification templates. See the [Notificator privacy policy](https://notificator-project.com/privacy/).

## Troubleshooting

### No content types appear

Create at least one collection type or single type in Content-Type Builder.
Only application models whose UID begins with `api::` are listed. Restart
Strapi when Content-Type Builder asks you to do so.

### Test connection is disabled

Confirm `NOTIFICATOR_API_KEY` is available to the running Strapi server and
restart Strapi. Credentials are not entered in the admin page.

### Local activity works but remote delivery does not

- Confirm the API card says **Configured**.
- Use **Test connection**.
- Check the Strapi server log.
- Confirm the rule's remote choices are enabled.
- Check push and email preferences in the mobile app.

### A Strapi toast does not appear immediately

Keep the Strapi admin application open and allow up to 15 seconds. The event
can still appear in the local activity feed if the toast was missed while the
admin panel was closed.

### MQTT is skipped

Confirm all HiveMQ variables, the API key, and the rule's MQTT choice. The
hostname must end in `.hivemq.cloud` and must not include `https://`, a port, or
`/mqtt`.

### A rule does not run

- Confirm the rule and selected content type are enabled.
- Confirm the action matches exactly, especially update versus publish.
- Perform a successful operation; failed content writes do not create alerts.
- Check the Strapi server log and the extension's activity feed.

## Update or remove the extension

Review preview release notes before updating:

```bash
npm install @notificator-project/strapi-extension@latest
```

To remove it, uninstall the package, remove the `notificator` block from
`config/plugins.ts`, and restart Strapi:

```bash
npm uninstall @notificator-project/strapi-extension
```

## Project links

- [Source repository](https://github.com/notificator-project/Strapi-Extension)
- [Report an extension issue](https://github.com/notificator-project/Strapi-Extension/issues)
- [Create API Key (Mobile)](/guides/mobile-api-key-creation/)
- [MQTT Broker Setup](/guides/mqtt-broker-setup/)
- [App Settings Guide](/guides/app-settings/)

Notificator is an independent open-source project and is not affiliated with or
endorsed by Strapi Solutions SAS or HiveMQ GmbH.

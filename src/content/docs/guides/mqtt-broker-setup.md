---
title: MQTT Broker Setup
description: Connect your own HiveMQ Cloud cluster to WordPress, the mobile app, and a Notificator device.
---

Notificator does not provide a shared or default MQTT broker. MQTT delivery is
optional and currently requires your own HiveMQ Cloud cluster.

Dashboard alerts do not need an account, API key, or MQTT broker. Mobile push
requires a Notificator API key but does not require MQTT.

:::note[Current provider support]
HiveMQ Cloud is the only MQTT provider supported by the current Notificator
plugin and firmware release.
:::

## Create a free HiveMQ Cloud cluster

HiveMQ offers a **Serverless FREE** plan with no credit card required. HiveMQ
currently describes it as including up to 100 connections, 10 GB of monthly
traffic, MQTT over TLS, and WebSocket support. These limits and terms are
controlled by HiveMQ and may change.

1. Open the [HiveMQ Cloud console](https://console.hivemq.cloud/) and create an
   account or sign in.
2. Select **Create Serverless Cluster**.
3. When the cluster is ready, select **Manage Cluster**.
4. In the cluster overview, locate its generated **URL** and **Port (TLS)**.
5. Copy the URL. Notificator needs only the hostname, without `https://` or a
   port.

See HiveMQ's [Cloud plan page](https://www.hivemq.com/products/mqtt-cloud-broker/)
and [official quick-start guide](https://docs.hivemq.com/hivemq-cloud/quick-start-guide.html)
for current plan details and console instructions.

## Create the credentials

In the cluster's **Access Management** area:

1. Open **Authentication → Credentials**.
2. Create a **Publish Only** credential for the WordPress plugin.
3. Create another **Publish Only** credential for mobile device commands.
4. Create a separate **Publish and Subscribe** credential for the device.
5. Save the usernames and passwords securely. HiveMQ notes that credential
   changes can take up to one minute to become active.

Separating the credentials prevents the WordPress site and phone from receiving
device subscriptions, allows one client to be revoked without affecting the
others, and makes future credential rotation easier.

## What you need

- A HiveMQ Cloud cluster with secure MQTT and WebSocket access.
- An enabled Notificator WordPress API key.
- The cluster hostname, usernames, and passwords.
- One topic prefix shared by WordPress and every intended device. New
  configurations default to `notificator-project`.

Use separate credentials when possible:

- A **publisher** credential for the WordPress plugin.
- A separate **publisher** credential for mobile device commands.
- A **device** credential limited to the topics that device must subscribe to
  and publish.

## Configure the WordPress plugin

1. Open **Notificator → Settings → Connections**.
2. Under **Remote delivery**, add and enable your Notificator API key.
3. Under **MQTT broker**, turn on **Enable MQTT delivery**.
4. Enter the HiveMQ Cloud cluster hostname, publisher username, password, and
   topic prefix.
5. Save the settings.
6. Select **Test broker**.

The plugin connects through secure WebSockets on port `8884` and path `/mqtt`.
The broker password is encrypted locally, excluded from exports and logs, and
added to an HTTPS delivery request only in memory.

## Configure the mobile app

1. Open **Account → Device connection**.
2. Expand **HiveMQ Cloud**.
3. Enter the cluster hostname, mobile publisher username, password, and the
   same topic prefix used by WordPress and the device.
4. Select **Save connection**.

The mobile app stores this connection in the phone's operating-system secure
credential store. It supplies the details only in memory when sending a device
command through an authenticated HTTPS request. MQTT credentials are not saved
to the Notificator database or synced between phones, so configure each phone
that needs to control devices.

## Configure the device

Open the device setup portal and enter:

- the same HiveMQ Cloud cluster hostname;
- the secure MQTT port, normally `8883`;
- the device username and password;
- exactly the same topic prefix used in WordPress.

The device stores its credentials in local ESP32 preferences and does not send
the saved password back to the setup page.

For a device ID such as `abc123`, the default topic layout is:

- `notificator-project/abc123/messages`
- `notificator-project/abc123/cmd`
- `notificator-project/abc123/status`

## Enable MQTT for an event

Open a notification in the WordPress plugin and enable its **MQTT** channel.
Dashboard and mobile-push choices remain independent.

MQTT is paused when the broker setting is off or incomplete. Notificator will
not silently fall back to another broker.

## Troubleshooting

### The summary says Not configured

Open **Settings → Connections**, enable MQTT delivery, complete every broker
field, and save.

### The broker test is disabled

Confirm that the broker configuration is complete and at least one Notificator
API key is enabled.

### WordPress connects but the device receives nothing

- Confirm WordPress, the mobile app, and the device use the same cluster and
  topic prefix.
- Check the device ID and broker permissions.
- Make sure the device credential can subscribe to its `messages` and `cmd`
  topics and publish to its `status` topic.
- Confirm the notification has its MQTT channel enabled.

### Mobile device commands ask for a connection

Open **Account → Device connection** and save the HiveMQ Cloud publisher
credential for that phone. The connection is intentionally not restored from
Supabase or copied from WordPress.

## Current provider support

The current WordPress integration validates HiveMQ Cloud hostnames and its
standard secure WebSocket endpoint. Support for other MQTT providers is planned,
but is not part of the current configuration.

HiveMQ Cloud is an independent third-party service. Notificator is not affiliated
with or endorsed by HiveMQ.

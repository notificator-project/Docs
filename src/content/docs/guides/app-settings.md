---
title: App Settings Guide
description: Configure profile, notifications, device connectivity, API keys, and personalization options in the mobile app.
---

Use this page as a practical map of mobile settings after onboarding.

## Profile and security

Recommended:

- Keep profile info up to date.
- Enable Two-Factor Authentication (2FA).
- Review active sessions/devices when available.

## Notifications

Check these first:

- Device push enabled for current device.
- Notification permissions allowed by OS.
- Email notification preference as desired.

## API keys management

From Profile -> API Keys:

- Create separate keys per integration.
- Select key type when creating a key:
  - `WordPress` for plugin/server workflow
  - `Public API` for `public-notify`
  - `Internal` for trusted backend automation
- Rename keys with clear environment labels.
- Revoke old or unused keys.

Each active key card also shows:

- Key type
- Last used timestamp
- Allowed domains count

## Device connection

Notificator does not provide a default MQTT broker. To send commands to a
Notificator Base or Touch device:

1. Open **Account → Device connection**.
2. Expand **HiveMQ Cloud**.
3. Enter the hostname and mobile publisher credential from your HiveMQ Cloud
   cluster.
4. Use the same topic prefix configured in WordPress and on the device. New
   setups default to `notificator-project`.
5. Save the connection.

The connection is stored only in the operating system's secure credential store
on that phone. It is sent transiently to the API when delivering a command and
is never stored in Supabase. Use **Remove** to delete it, or **Clear Data & Sign
Out** to remove it together with the other local account data.

See [MQTT Broker Setup](/guides/mqtt-broker-setup/) for HiveMQ Cloud setup and
credential permissions.

## Device controls

Open a saved device to configure the controls supported by that model:

- **Notificator Base:** idle mode, weather location and timezone, and display
  brightness.
- **Notificator Touch:** idle mode, weather location and timezone, display
  brightness, and sound volume.

The app sends these controls through the HiveMQ connection stored on the phone.
If a save succeeds but live settings cannot be delivered, verify the device is
online and recheck the publisher username and password under **Device
connection**.

## Home and UI preferences

Common settings include:

- Theme selection.
- Language selection.
- Visibility toggles for home widgets.

Suggested baseline:

- Show Active Devices = ON
- Show Recent Notifications = ON
- Keep only widgets you use frequently.

## Diagnostics checklist

If notifications do not arrive:

1. Confirm app push permission in device settings.
2. Confirm push toggle for current device.
3. Confirm user is signed into correct account.
4. Send a test notification from plugin/API.
5. For device commands, confirm **Account → Device connection** is configured
   and uses the same cluster and topic prefix as the device.

## Related guides

- [Create API Key (Mobile)](/guides/mobile-api-key-creation/)
- [WordPress Plugin Setup](/guides/wordpress-plugin-setup/)
- [MQTT Broker Setup](/guides/mqtt-broker-setup/)
- [Notificator Base Setup](/guides/notificator-base-setup/)
- [Notificator Touch Setup](/guides/notificator-touch-setup/)
- [Quick Start](/guides/quick-start/)

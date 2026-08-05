---
title: Firmware Updates
description: Understand Notificator model releases, signed OTA updates, and the one-time migration required by older devices.
---

Notificator firmware is maintained in the public
[IoT-Firmware repository](https://github.com/notificator-project/IoT-Firmware).
Each hardware model has a stable identity, its own source directory, and
independent release entries:

- **Notificator Base**: `notificator_base`
- **Notificator Touch 3.49**: `notificator_touch_349` (preview)
- **Notificator Matter**: `notificator_matter` (planned)

Keeping models together makes project-wide maintenance easier while preventing
a release for one board from being installed on another.

## How an update works

1. The mobile app reads the official firmware manifest and shows the latest
   compatible version.
2. When you approve the update, the API publishes a channel request to your
   device over your configured HiveMQ connection.
3. The device downloads the fixed official manifest and selects its own model,
   board, and release channel.
4. The device verifies the release entry using its embedded ECDSA P-256 public
   key.
5. It streams the firmware into the inactive OTA slot and verifies its SHA-256
   digest before activation.
6. The device restarts and reports the installed version and update status.

The private release-signing key is never stored in the mobile app, API,
WordPress plugin, MQTT broker, or device.

## Release channels

- `stable`: recommended public releases.
- `preview`: pre-release builds intended for testing.

The device rejects arbitrary download URLs and releases for another model or
board.

Current public releases use independent model tags and channels:

- **Base 1.2.1**: stable channel, tagged `base-v1.2.1`.
- **Touch 0.9.1**: preview channel, tagged `touch-v0.9.1`.

The browser installer lists both models and checks the connected ESP32 family
before flashing. Always choose the entry matching the physical board.

## Older devices

Older firmware and partition layouts are not part of the current OTA
compatibility path. Flash those devices once using USB or the forthcoming web
installer. The complete installer writes the current firmware and dual-slot
partition table, after which signed OTA updates are available.

## Related

- [Notificator Base Setup](/guides/notificator-base-setup/)
- [Notificator Touch Setup](/guides/notificator-touch-setup/)
- [MQTT Broker Setup](/guides/mqtt-broker-setup/)
- [Complete Workflow](/guides/workflow-overview/)

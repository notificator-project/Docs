---
title: Notificator Touch Setup
description: Install and configure the Notificator Touch 3.49 preview, including Wi-Fi, HiveMQ, clock and weather, display controls, and OTA updates.
---

Notificator Touch 3.49 is the touchscreen model for the Waveshare ESP32-S3
Touch LCD 3.49. Firmware `0.9.3` is a preview release while its interaction
design and update flow are validated before version 1.0.

:::caution[Use the matching firmware]
Touch firmware is only for the Waveshare ESP32-S3 Touch LCD 3.49. Do not install
it on Notificator Base or another ESP32 board.
:::

## What you need

- A Waveshare ESP32-S3 Touch LCD 3.49 and USB data cable.
- A phone or computer for first-time setup.
- Your own HiveMQ Cloud cluster and a device credential with publish and
  subscribe access.
- The Notificator mobile app, an active WordPress or Internal API key, and the
  mobile HiveMQ connection saved under **Account → Device connection**.

Follow [MQTT Broker Setup](/guides/mqtt-broker-setup/) before starting if the
cluster and credentials are not ready.

## 1. Install the preview firmware

Open the [firmware web installer](https://notificator-project.com/firmware-installer/)
in desktop Chrome or Edge, select **Notificator Touch 3.49**, and connect the
board over USB.

A browser installation writes the complete factory image and erases existing
device configuration. It is the recommended first installation and recovery
method. Future compatible releases can normally use signed OTA updates.

## 2. Complete first-time setup

After the device restarts:

1. Note the pairing ID shown on screen.
2. Join the `WPNOTIF-<ID>` Wi-Fi network.
3. If the portal does not open, visit `http://192.168.4.1`.
4. Choose the local Wi-Fi network and enter its password.
5. Enter the HiveMQ Cloud hostname, secure port, device username, password,
   and topic prefix.
6. Keep the topic prefix as `notificator-project` unless the same custom prefix
   is already used by WordPress and the mobile app.
7. Review the detected UTC offset and save.

The setup portal stores Wi-Fi and broker credentials only on the device. When
you reopen it, the MQTT password remains blank; leaving it blank keeps the
saved password.

## 3. Add the device to the mobile app

1. Open **Devices → Add Device**.
2. Choose **Notificator Touch**.
3. Enter the pairing ID exactly as displayed.
4. Add an optional nickname and save.

Touch device IDs are normalized by the platform, but using the displayed
lowercase value avoids confusion when checking MQTT topics.

## 4. Configure the screen

The device supports **Clock**, **Weather & Clock**, and **Weather** idle modes.
Enter a city, area, or postal code in the device editor, choose the intended
match, review the timezone, then save to send the resolved weather location
over MQTT. Latitude and longitude are handled internally; manual values remain
available under **Advanced location** when needed.

The same screen also provides sliders for:

- **Display brightness**
- **Sound volume**

Both values are stored on the device. They can also be changed locally from
the Touch **Settings** screen. Notificator Base supports brightness but does
not expose a sound-volume control.

## Everyday controls

- Use **Home**, **Alerts**, **Device**, and **Settings** in the bottom bar.
- Browse the six latest in-memory alerts using **Newer** and **Older**.
- Alert accents distinguish Info, Warning, and Critical severity.
- After 60 seconds of inactivity, the device enters its clock or weather view.
  Touch the display to wake it.
- Open **Settings** to scan for and change Wi-Fi directly on the device. The
  previous network is restored if the new connection fails.
- Hold **BOOT** for four seconds to reopen the phone-based setup portal.
- Hold **PWR** for about 1.8 seconds to shut down. The reset control restarts
  immediately.

## Firmware updates

Touch uses the separate `preview` OTA channel. In the mobile app, open the
device, select **Check for Updates**, and then approve the compatible release.

The app sends the update request through the HiveMQ connection stored on that
phone. The device then downloads the official model-specific manifest,
verifies its ECDSA signature and firmware SHA-256 digest, installs the image,
and reports the new version after restarting.

If the app shows **Connection refused: Not authorized**, re-enter the HiveMQ
username and password under **Account → Device connection**. That message means
the broker rejected the publisher credential before the OTA request reached
the device.

## Troubleshooting

- **No setup portal:** join `WPNOTIF-<ID>` and manually open `192.168.4.1`.
- **No on-screen keyboard:** ensure the installed model is Touch 0.9.1 or newer.
- **Mark all read has no effect:** install Touch 0.9.3 or newer, then retry the
  command from the app while the device is connected to MQTT.
- **Commands do not arrive:** confirm the phone, device, and WordPress plugin
  use the same cluster and topic prefix.
- **Weather is wrong:** search for the location again, select the intended
  regional match, and review the timezone. Use manual coordinates only when the
  place search cannot identify the required location.
- **OTA is not offered:** check that the device type is Touch and the preview
  channel is available.
- **Recovery required:** reinstall the complete Touch factory image through
  the browser installer.

## Related

- [MQTT Broker Setup](/guides/mqtt-broker-setup/)
- [Firmware Updates](/guides/firmware-updates/)
- [App Settings Guide](/guides/app-settings/)
- [Notificator Base Setup](/guides/notificator-base-setup/)

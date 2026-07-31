---
title: Notificator Base Setup
description: Add and configure a Notificator Base device from the mobile app, including idle theme, weather, and firmware updates.
---

Use this guide to connect and configure a Notificator Base device in the app.

## Prerequisites

- You are signed in to the mobile app.
- You have at least one active API key of type WordPress or Internal.
- You have your own HiveMQ Cloud cluster and device credentials.
- Your device is powered on and in setup mode.

The current firmware supports HiveMQ Cloud only. HiveMQ offers a Serverless free
plan; follow [MQTT Broker Setup](/guides/mqtt-broker-setup/) to create the
cluster and find its hostname and credentials before opening the device portal.

## 1. Open the device setup portal

On first boot, after a Wi-Fi reset, or after holding the capacitive control for
six seconds, the device opens the local Notificator setup portal. The portal
runs entirely on the device and does not load fonts, scripts, or other assets
from the internet.

1. Power on the device and wait 10-30 seconds.
2. On your phone, open Wi-Fi settings.
3. Connect to the device hotspot named `WPNOTIF-<deviceId>`.
4. If the captive portal does not open automatically, open a browser and go to `192.168.4.1`.
5. Choose **Set up this device**.
6. Select your home or office Wi-Fi network and enter its password.
7. In **Message delivery**, enter your HiveMQ Cloud hostname, secure MQTT port, device username,
   password, and topic prefix.
8. Use exactly the same cluster and topic prefix configured in the WordPress
   plugin. New configurations default to `notificator-project`.
9. Save and wait for the device to restart and connect.

After successful connection, the temporary setup hotspot disappears and the device becomes reachable on your normal network.

Notificator does not provide a default MQTT broker. See
[MQTT Broker Setup](/guides/mqtt-broker-setup/) before configuring the device.
The portal also provides **Device information** for checking network and
hardware details without changing the saved configuration. Firmware update
credentials are not requested because official releases are authenticated by
the device itself.

## 2. Add or open the device

In the mobile app:

1. Open **Account → Device connection** and save the HiveMQ Cloud hostname,
   mobile publisher credential, and topic prefix.
2. Open Devices.
3. Tap Add Device (or edit an existing device).
4. Set Device Type to Notificator Base.
5. Enter Device ID and optional nickname.

Save the device.

The phone stores its MQTT connection in operating-system secure storage, not
Supabase. Use the same cluster and topic prefix as the device, but preferably a
separate publish-only credential.

## 3. Configure idle theme

In device settings, choose one of:

- Clock
- Weather & Clock
- Weather

Weather & Clock alternates on-device every 2.5 seconds:

- 2.5s clock
- 2.5s weather

## 4. Configure weather (optional)

If you use Weather or Weather & Clock:

- Set city/timezone, or
- Set manual latitude/longitude.

If coordinates are provided, latitude and longitude must both be valid.

### Weather fields explained

- `Latitude (lat)`: north/south position on Earth.
  - Range: `-90` to `90`
  - Example: Athens is about `37.9838`
- `Longitude (lon)`: east/west position on Earth.
  - Range: `-180` to `180`
  - Example: Athens is about `23.7275`

Why these fields are used:

- They let the device fetch weather for the exact location you want.
- They are more precise than city names when multiple places share similar names.
- They keep weather stable even if network geo/IP detection is inaccurate.

### Easy ways to get lat/lon

1. Google Maps
	- Open maps, long-press your location.
	- Copy the coordinate pair shown (for example `37.9838, 23.7275`).

2. OpenStreetMap
	- Open your location and click Share/Query features.
	- Read latitude and longitude from the location details.

3. iPhone/Android map apps
	- Drop a pin and copy coordinates from pin details.

Tips:

- Use decimal format (not degrees/minutes/seconds).
- Use `.` as decimal separator.
- Paste both values together in app settings (lat and lon).

## 5. Send settings to device

When you save, the app sends device commands to apply:

- idle theme
- weather configuration (if set)

If save succeeds but device screen does not change immediately, verify the device is online and not paused.

## 6. Verify status

On the Devices screen, check:

- Last status dot (up/down/slow)
- Device metadata line (type, theme, firmware)

You can also use the device actions to clear messages or refresh firmware status.

## 7. Install firmware updates

Open the device in the mobile app and check for an update. The app displays the
latest compatible release and asks the API to notify the device using the
selected `stable` or `preview` channel.

The device downloads the official model-specific manifest, verifies its
ECDSA signature using a public key compiled into the firmware, and confirms the
firmware file's SHA-256 digest before activating it. MQTT, WordPress, and mobile
app credentials are not used to sign firmware.

Devices using an older flash partition layout require one complete USB or web
installer flash before they can use the current A/B OTA system. This is a
one-time migration; current Notificator Base installations can then update
over the air.

## Troubleshooting

- Setup portal does not open: after joining the setup hotspot, manually visit `http://192.168.4.1`.
- Device hotspot not visible: power-cycle the device and wait up to 30 seconds.
- Wrong Wi-Fi credentials: reboot to setup mode and re-enter them in the Notificator setup portal.
- MQTT setup required: connect your own HiveMQ Cloud cluster; the project does
  not provide a shared broker.
- No MQTT notifications: verify the device and WordPress plugin use the same
  cluster and topic prefix.
- Command failed: ensure your account has an active WordPress/Internal API key
  and **Account → Device connection** contains the correct HiveMQ details.
- No device response: verify device ID matches firmware device ID exactly.
- Weather not showing: verify Wi-Fi connectivity and timezone/coordinates.
- Theme not persisting: confirm DB migration for idle_theme is applied.

## Related

- [App Settings Guide](/guides/app-settings/)
- [Complete Workflow](/guides/workflow-overview/)
- [MQTT Broker Setup](/guides/mqtt-broker-setup/)

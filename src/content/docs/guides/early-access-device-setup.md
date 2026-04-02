---
title: Early Access Device Setup
description: Add and configure an Early Access ESP32 device from the mobile app, including idle theme and weather options.
---

Use this guide to connect and configure the physical Early Access device in the app.

## Prerequisites

- You are signed in to the mobile app.
- You have at least one active API key of type WordPress or Internal.
- Your device is powered on and in setup mode.

## 1. Connect device to Wi-Fi (ESP WiFiManager)

If this is the first boot (or after a Wi-Fi reset), the device opens an ESP WiFiManager portal.

1. Power on the device and wait 10-30 seconds.
2. On your phone, open Wi-Fi settings.
3. Connect to the device hotspot (usually named `Notificator-Setup` or `ESP32-Setup`).
4. If the captive portal does not open automatically, open a browser and go to `192.168.4.1`.
5. In the WiFiManager page, select your home/office Wi-Fi network.
6. Enter the Wi-Fi password and save.
7. Wait for the device to restart and connect.

After successful connection, the temporary setup hotspot disappears and the device becomes reachable on your normal network.

## 2. Add or open the device

In the mobile app:

1. Open Devices.
2. Tap Add Device (or edit an existing device).
3. Set Device Type to Early Access Device.
4. Enter Device ID and optional nickname.

Save the device.

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

## Troubleshooting

- WiFiManager page does not open: after joining the setup hotspot, manually visit `http://192.168.4.1`.
- Device hotspot not visible: power-cycle the device and wait up to 30 seconds.
- Wrong Wi-Fi credentials: reboot to setup mode and re-enter credentials in WiFiManager.
- Command failed: ensure your account has an active WordPress/Internal API key.
- No device response: verify device ID matches firmware device ID exactly.
- Weather not showing: verify Wi-Fi connectivity and timezone/coordinates.
- Theme not persisting: confirm DB migration for idle_theme is applied.

## Related

- [App Settings Guide](/guides/app-settings/)
- [Complete Workflow](/guides/workflow-overview/)

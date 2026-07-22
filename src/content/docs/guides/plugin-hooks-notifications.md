---
title: WordPress Hook Discovery
description: Understand scanned hooks, observed events, and explicit event integrations.
---

Notificator can learn about WordPress events in two ways.

## Explicit registration (recommended for plugin authors)

A plugin registers the action name, a plain-language description, and ordered argument names. The event appears in Discover immediately with high confidence and does not depend on static code scanning.

Follow [WordPress Custom Events](/guides/wordpress-custom-events/) to publish a first-class integration.

## Source-code discovery

For plugins without a Notificator integration, **Scan plugins** looks for WordPress emitters such as:

- `do_action()` and `do_action_ref_array()`;
- `apply_filters()` and `apply_filters_ref_array()`;
- supported prefixed wrapper functions.

Discovery ranks likely emitted events above callback registrations and routine lifecycle hooks. It also provides separate views for dynamic patterns, registration-only matches, and potentially noisy hooks.

The scan is designed for production sites: it processes plugins in resumable background batches, prevents overlapping jobs, bounds work per plugin, and reuses results for unchanged files. Start with active plugins only. Under **Notificator → Settings → Event discovery**, adjust the per-plugin event limit only when you need a wider result set; it is not a site-wide total.

After a successful scan, Notificator stores a fingerprint for each plugin it covered. If another plugin is later activated without a saved fingerprint, Overview recommends a new scan and identifies the plugin directly. Checking for this state only compares the active plugin list with saved metadata; it does not read plugin source files or add scan work to ordinary admin requests.

Scan completion refreshes Overview and the Discover inbox in place, including event cards, filters, and totals.

## Observation mode

Static analysis cannot prove that an event runs on your site. Use **Observe for 10 min** to record safe runtime metadata:

- execution count;
- argument count and types;
- last-seen time and request context.

Argument values are not stored by observation mode.

Observation is optional and temporary. It batches database writes to reduce load, but it still adds runtime bookkeeping while active. Use it when static discovery cannot tell whether a candidate actually fires, then stop it when you have enough evidence.

## Choosing an event

Prefer events that are:

- explicitly registered or rated high confidence;
- emitted after a meaningful business outcome;
- stable across plugin versions;
- narrow enough to avoid excessive volume;
- supplied with useful argument names for conditions.

Use conditions and throttling for events that can fire frequently.

## Related

- [WordPress Custom Events](/guides/wordpress-custom-events/)
- [Plugin Template Creation](/guides/plugin-template-creation/)
- [WordPress Plugin Setup](/guides/wordpress-plugin-setup/)

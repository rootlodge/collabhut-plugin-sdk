/**
 * Licensing and collaboration-access types for @collabhut/plugin-sdk.
 *
 * ## Overview
 * CollabDAW verifies plugin licenses server-side on every load.  There is
 * **no user-facing license key** — the DAW sends the current user's session
 * token and the plugin's `manifest.id` to the CollabHut API, which returns a
 * `LicenseCheckResult`.
 *
 * ## Collaboration access rules (IMPORTANT)
 *
 * A user who does **not** own a license to a paid plugin may still use that
 * plugin under the following conditions — **all must be true**:
 *
 * 1. They are an active participant in a collaboration (`status !== "completed"`).
 * 2. At least one other participant in that collaboration **does** own a license
 *    for the plugin.
 * 3. The plugin's `pricing` field is `"paid"` (free plugins require no license).
 *
 * When the collaboration is marked completed, collab-access is revoked.
 * The user cannot export or render the track if the collab plugin access has
 * lapsed.
 *
 * This policy is enforced both in the DAW runtime (via `LicenseCheckResult`)
 * and in CollabHut's server API.
 */
export {};

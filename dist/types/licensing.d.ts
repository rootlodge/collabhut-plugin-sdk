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
/** ISO-8601 datetime string */
type IsoDateString = string;
/**
 * Describes the permission granted through a collaboration partner's license.
 * Only valid while the collaboration is active (not completed).
 */
export interface CollaborationAccess {
    /** The CollabHut collaboration ID granting access */
    readonly collaborationId: string;
    /** The user ID of the participant who owns the license */
    readonly ownerUserId: string;
    /**
     * Access expires at this time regardless of collab status.
     * The DAW must re-verify before this timestamp.
     * Null = access is valid for the lifetime of the collaboration.
     */
    readonly allowedUntil: IsoDateString | null;
}
/**
 * A signed license token returned by the CollabHut API.
 *
 * The DAW must not cache this across sessions — it re-verifies on every
 * project open to handle revocations and collab completions.
 */
export interface LicenseToken {
    /** Plugin manifest ID this token covers */
    readonly pluginId: string;
    /** The user ID this token was issued to */
    readonly userId: string;
    /**
     * Type of access:
     * - `"owned"` — user has purchased (or the plugin is free)
     * - `"collab"` — access granted through a collaboration partner
     * - `"free"` — plugin has `pricing: "free"`, no purchase needed
     */
    readonly accessType: "owned" | "collab" | "free";
    /**
     * Present when `accessType === "collab"`.
     * Contains collab-specific access constraints.
     */
    readonly collaborationAccess?: CollaborationAccess;
    /**
     * Token expiry — DAW must re-verify after this time.
     * Short-lived (typically 1 hour) to support near-real-time revocation.
     */
    readonly expiresAt: IsoDateString;
    /**
     * Opaque HMAC signature from the CollabHut server.
     * The DAW validates this against the public key embedded in the app.
     * Do not store or forward this value.
     */
    readonly signature: string;
}
/** The DAW was granted access */
export interface LicenseGranted {
    readonly granted: true;
    readonly token: LicenseToken;
}
/** The DAW was denied access with a human-readable reason */
export interface LicenseDenied {
    readonly granted: false;
    /**
     * Machine-readable denial code:
     * - `"not-purchased"` — user does not own this plugin
     * - `"collab-completed"` — the collaboration granting access is finished
     * - `"collab-not-member"` — user is no longer in the collaboration
     * - `"revoked"` — license was revoked (e.g., charge-back)
     * - `"expired"` — token is past its `expiresAt` (re-verify required)
     * - `"plugin-delisted"` — plugin was removed from the marketplace
     */
    readonly code: "not-purchased" | "collab-completed" | "collab-not-member" | "revoked" | "expired" | "plugin-delisted";
    /** Human-readable explanation shown to the user in the DAW */
    readonly reason: string;
}
/** Result of a license verification call */
export type LicenseCheckResult = LicenseGranted | LicenseDenied;
/**
 * DAW-side interface for performing license checks.
 *
 * This is injected by the DAW runtime — plugin code never calls it directly.
 * It is documented here so host environment authors can implement it correctly.
 */
export interface LicenseChecker {
    /**
     * Verify that the current user may load a plugin.
     * @param pluginId         The plugin's `manifest.id`
     * @param collaborationId  Active collaboration context (if any)
     */
    check(pluginId: string, collaborationId?: string): Promise<LicenseCheckResult>;
}
export {};
//# sourceMappingURL=licensing.d.ts.map
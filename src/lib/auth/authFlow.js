import {
  AGENT_DASHBOARD_PREFIX,
  AUTH_SIGN_IN_PATH,
  LIST_PROPERTY_INTENT,
  ROLE_AGENT,
} from "./constants.js";

/** @typedef {import('../../types/auth.js').AuthUser} AuthUser */

/**
 * Whether the auth flow must collect a role before showing sign-in / sign-up.
 *
 * @param {{ intent?: string, from?: string, reason?: string }} locationState
 * @returns {boolean}
 */
export function requiresRoleSelection(locationState = {}) {
  if (locationState.intent === LIST_PROPERTY_INTENT) return true;
  if (locationState.from?.startsWith(AGENT_DASHBOARD_PREFIX)) return true;
  if (locationState.reason === "agent_auth_required") return true;
  return false;
}

/**
 * Navigation target for the "List property" entry point.
 *
 * @param {{ isAuthenticated: boolean, user?: AuthUser | null }} auth
 * @returns {{ to: string, state?: Record<string, unknown> }}
 */
export function getListPropertyNavigationTarget({ isAuthenticated, user }) {
  if (isAuthenticated) {
    if (user?.role === ROLE_AGENT) {
      return { to: AGENT_DASHBOARD_PREFIX };
    }
    return { to: "/" };
  }

  return {
    to: AUTH_SIGN_IN_PATH,
    state: {
      intent: LIST_PROPERTY_INTENT,
      from: AGENT_DASHBOARD_PREFIX,
    },
  };
}

export const AGENT_ACCESS_DENIED_MESSAGE =
  "The Agent Dashboard is only available to registered agents. Sign in with an agent account to continue.";

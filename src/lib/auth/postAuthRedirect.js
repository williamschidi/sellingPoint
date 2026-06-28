import {
  AGENT_DASHBOARD_PREFIX,
  LIST_PROPERTY_INTENT,
  ROLE_AGENT,
} from "./constants.js";

/** @typedef {import('../../types/auth.js').UserRole} UserRole */

/**
 * Centralized post-authentication redirect.
 * Replace path resolution with backend-provided landing URLs when auth ships.
 *
 * @param {{ role: UserRole, from?: string, intent?: string }} options
 * @returns {string}
 */
export function getPostAuthRedirect({ role, from, intent }) {
  if (role === ROLE_AGENT) {
    if (from?.startsWith(AGENT_DASHBOARD_PREFIX)) return from;
    if (intent === LIST_PROPERTY_INTENT) return AGENT_DASHBOARD_PREFIX;
    return AGENT_DASHBOARD_PREFIX;
  }

  if (from && !from.startsWith(AGENT_DASHBOARD_PREFIX)) return from;
  return "/";
}

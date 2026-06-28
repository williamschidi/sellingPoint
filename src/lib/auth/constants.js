/** @typedef {import('../../types/auth.js').UserRole} UserRole */

/** @type {UserRole} */
export const ROLE_AGENT = "agent";

/** @type {UserRole} */
export const ROLE_BUYER = "buyer";

export const AUTH_SIGN_IN_PATH = "/sign-in";

export const LIST_PROPERTY_INTENT = "list-property";

export const AGENT_DASHBOARD_PREFIX = "/dashboard";

export const MOCK_SESSION_STORAGE_KEY = "sellingpoint:mock-auth-session";
export const PENDING_ROLE_STORAGE_KEY = "sellingpoint:auth-pending-role";

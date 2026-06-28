import { USE_MOCK_DATA } from "../config.js";
import { apiRequest } from "../client.js";
import { ROLE_BUYER } from "../../lib/auth/constants.js";
import {
  clearMockSession,
  clearPendingRole,
  loadMockSession,
  loadPendingRole,
  saveMockSession,
} from "../../lib/auth/mockAuthStorage.js";

/** @typedef {import('../../types/auth.js').AuthResult} AuthResult */
/** @typedef {import('../../types/auth.js').AuthUser} AuthUser */
/** @typedef {import('../../types/auth.js').UserRole} UserRole */

const NOT_CONNECTED = {
  ok: false,
  error:
    "Authentication is not connected yet. Browse and book inspections as a guest.",
  code: "not_connected",
};

/**
 * Whether the real auth API is wired for this deployment.
 * TODO: Replace with VITE_AUTH_ENABLED when backend auth ships.
 */
export function isAuthBackendConnected() {
  return !USE_MOCK_DATA;
}

/**
 * Mock auth is active during frontend-only development.
 * Swap mock handlers for API calls without changing AuthContext consumers.
 */
export function isMockAuthEnabled() {
  return USE_MOCK_DATA;
}

/**
 * Auth UI and route guards are enabled when mock or real auth is available.
 */
export function isAuthEnabled() {
  return isMockAuthEnabled() || isAuthBackendConnected();
}

/**
 * @param {{ email?: string, name?: string }} payload
 * @param {UserRole} role
 * @returns {AuthUser}
 */
function buildMockUser(payload, role) {
  const email = payload.email?.trim() || "guest@sellingpoint.ng";
  const name =
    payload.name?.trim() ||
    email.split("@")[0]?.replace(/\./g, " ") ||
    "SellingPoint User";

  return {
    id: `mock-${role}-${Date.now()}`,
    email,
    name,
    role,
  };
}

/**
 * TODO: Backend GET /auth/session — restore session from httpOnly cookie or token.
 * @returns {Promise<AuthResult>}
 */
export async function getSession() {
  if (USE_MOCK_DATA) {
    const user = loadMockSession();
    return { ok: true, user: user ?? undefined };
  }

  try {
    return await apiRequest("/auth/session");
  } catch {
    return { ok: true, user: null };
  }
}

/**
 * TODO: Backend POST /auth/sign-in
 * @returns {Promise<AuthResult>}
 */
export async function signInWithEmail(credentials) {
  if (USE_MOCK_DATA) {
    const role = loadPendingRole() ?? ROLE_BUYER;
    const user = buildMockUser(credentials, role);
    saveMockSession(user);
    clearPendingRole();
    return { ok: true, user };
  }

  return apiRequest("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

/**
 * TODO: Backend POST /auth/sign-up
 * @returns {Promise<AuthResult>}
 */
export async function signUpWithEmail(payload) {
  if (USE_MOCK_DATA) {
    const role = loadPendingRole() ?? ROLE_BUYER;
    const user = buildMockUser(payload, role);
    saveMockSession(user);
    clearPendingRole();
    return { ok: true, user };
  }

  return apiRequest("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * TODO: Backend POST /auth/sign-out
 * @returns {Promise<{ ok: boolean }>}
 */
export async function signOut() {
  if (USE_MOCK_DATA) {
    clearMockSession();
    return { ok: true };
  }

  return apiRequest("/auth/sign-out", { method: "POST" });
}

export { NOT_CONNECTED };

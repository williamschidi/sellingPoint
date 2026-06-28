import { USE_MOCK_DATA } from "../config.js";
import { apiRequest } from "../client.js";

/** @typedef {import('../../types/auth.js').AuthResult} AuthResult */

const NOT_CONNECTED = {
  ok: false,
  error:
    "Authentication is not connected yet. Browse and book inspections as a guest.",
  code: "not_connected",
};

/**
 * Whether the auth API is wired for this deployment.
 * TODO: Replace with VITE_AUTH_ENABLED when backend auth ships.
 */
export function isAuthBackendConnected() {
  return !USE_MOCK_DATA;
}

/**
 * TODO: Backend GET /auth/session — restore session from httpOnly cookie or token.
 */
export async function getSession() {
  if (USE_MOCK_DATA) {
    return { ok: true, user: null };
  }

  try {
    return await apiRequest("/auth/session");
  } catch {
    return { ok: true, user: null };
  }
}

/**
 * TODO: Backend POST /auth/sign-in
 */
export async function signInWithEmail(_credentials) {
  if (USE_MOCK_DATA) {
    return NOT_CONNECTED;
  }

  return apiRequest("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(_credentials),
  });
}

/**
 * TODO: Backend POST /auth/sign-up
 */
export async function signUpWithEmail(_payload) {
  if (USE_MOCK_DATA) {
    return NOT_CONNECTED;
  }

  return apiRequest("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(_payload),
  });
}

/**
 * TODO: Backend POST /auth/sign-out
 */
export async function signOut() {
  if (USE_MOCK_DATA) {
    return { ok: true };
  }

  return apiRequest("/auth/sign-out", { method: "POST" });
}

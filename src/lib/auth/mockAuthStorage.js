import {
  MOCK_SESSION_STORAGE_KEY,
  PENDING_ROLE_STORAGE_KEY,
} from "./constants.js";

/** @typedef {import('../../types/auth.js').AuthUser} AuthUser */
/** @typedef {import('../../types/auth.js').UserRole} UserRole */

function readJson(storage, key) {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeJson(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
}

/**
 * @returns {AuthUser | null}
 */
export function loadMockSession() {
  const parsed = readJson(localStorage, MOCK_SESSION_STORAGE_KEY);
  if (!parsed?.id || !parsed?.email || !parsed?.role) return null;
  return parsed;
}

/**
 * @param {AuthUser} user
 */
export function saveMockSession(user) {
  writeJson(localStorage, MOCK_SESSION_STORAGE_KEY, user);
}

export function clearMockSession() {
  localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
}

/**
 * @returns {UserRole | null}
 */
export function loadPendingRole() {
  const role = sessionStorage.getItem(PENDING_ROLE_STORAGE_KEY);
  if (role === "agent" || role === "buyer") return role;
  return null;
}

/**
 * @param {UserRole | null} role
 */
export function savePendingRole(role) {
  if (!role) {
    sessionStorage.removeItem(PENDING_ROLE_STORAGE_KEY);
    return;
  }
  sessionStorage.setItem(PENDING_ROLE_STORAGE_KEY, role);
}

export function clearPendingRole() {
  sessionStorage.removeItem(PENDING_ROLE_STORAGE_KEY);
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getSession,
  isAuthEnabled,
  isAuthBackendConnected,
  isMockAuthEnabled,
  signInWithEmail,
  signOut,
  signUpWithEmail,
} from "../api/services/authService";
import {
  loadPendingRole,
  savePendingRole,
} from "../lib/auth/mockAuthStorage.js";

/** @typedef {import('../types/auth.js').AuthUser} AuthUser */
/** @typedef {import('../types/auth.js').UserRole} UserRole */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [pendingRole, setPendingRoleState] = useState(() => loadPendingRole());

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      setStatus("loading");
      const result = await getSession();
      if (cancelled) return;

      setUser(result.user ?? null);
      setStatus(result.user ? "authenticated" : "guest");
    }

    loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const setPendingRole = useCallback((role) => {
    savePendingRole(role);
    setPendingRoleState(role);
  }, []);

  const signIn = useCallback(async (credentials) => {
    const result = await signInWithEmail(credentials);
    if (result.ok && result.user) {
      setUser(result.user);
      setStatus("authenticated");
      setPendingRoleState(null);
    }
    return result;
  }, []);

  const signUp = useCallback(async (payload) => {
    const result = await signUpWithEmail(payload);
    if (result.ok && result.user) {
      setUser(result.user);
      setStatus("authenticated");
      setPendingRoleState(null);
    }
    return result;
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setStatus("guest");
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      pendingRole,
      isAuthenticated: Boolean(user),
      isGuest: !user,
      isAgent: user?.role === "agent",
      isBuyer: user?.role === "buyer",
      authAvailable: isAuthEnabled(),
      authBackendConnected: isAuthBackendConnected(),
      mockAuthEnabled: isMockAuthEnabled(),
      setPendingRole,
      signIn,
      signUp,
      signOut: logout,
    }),
    [user, status, pendingRole, setPendingRole, signIn, signUp, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

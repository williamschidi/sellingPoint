import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getSession,
  isAuthBackendConnected,
  signInWithEmail,
  signOut,
  signUpWithEmail,
} from "../api/services/authService";

/** @typedef {import('../types/auth.js').AuthUser} AuthUser */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

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

  const signIn = useCallback(async (credentials) => {
    const result = await signInWithEmail(credentials);
    if (result.ok && result.user) {
      setUser(result.user);
      setStatus("authenticated");
    }
    return result;
  }, []);

  const signUp = useCallback(async (payload) => {
    const result = await signUpWithEmail(payload);
    if (result.ok && result.user) {
      setUser(result.user);
      setStatus("authenticated");
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
      isAuthenticated: Boolean(user),
      isGuest: !user,
      authAvailable: isAuthBackendConnected(),
      signIn,
      signUp,
      signOut: logout,
    }),
    [user, status, signIn, signUp, logout]
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

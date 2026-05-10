import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import authService from "../services/authService";

// FIX 5: AuthContext.jsx was not present in the uploaded codebase but is
//         imported by index.js (<AuthProvider>) and indirectly used across
//         auth pages and ProtectedRoute.  Without it every page that touches
//         auth crashes at runtime.  This is the canonical implementation that
//         matches all the authService calls already in the codebase.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true = still checking session

  // ── Bootstrap: check if there is an existing session cookie ──────────────
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authService.getCurrentUser();
        setUser(data.user);
      } catch {
        // 401 → no active session, that is fine
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // ── Auth actions ──────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const data = await authService.login({ email, password });
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await authService.register({ name, email, password });
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
}

export default AuthContext;

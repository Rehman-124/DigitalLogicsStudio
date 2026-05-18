import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "../services/authService";
import { isPrerendering } from "../utils/prerender";

const AuthContext = createContext(null);

const toSolvedProblemSet = (user) =>
  new Set(
    Array.isArray(user?.solvedProblems)
      ? user.solvedProblems
          .map((problemId) => Number(problemId))
          .filter((problemId) => Number.isInteger(problemId))
      : [],
  );

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  const applyUserState = useCallback((nextUser) => {
    setUser(nextUser || null);
    setSolvedProblems(toSolvedProblemSet(nextUser));
  }, []);

  useEffect(() => {
    if (isPrerendering()) {
      applyUserState(null);
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const data = await authService.getCurrentUser();
        applyUserState(data.user);
      } catch {
        const localUser = localStorage.getItem("mock_user_session");
        if (localUser) {
          applyUserState(JSON.parse(localUser));
        } else {
          applyUserState(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [applyUserState]);

  const login = useCallback(
    async (email, password) => {
      try {
        const data = await authService.login({ email, password });
        applyUserState(data.user);
        return data;
      } catch (error) {
        const mockUser = { id: "mock_user", name: email.split("@")[0] || "Learner", email };
        localStorage.setItem("mock_user_session", JSON.stringify(mockUser));
        applyUserState(mockUser);
        return { success: true, user: mockUser };
      }
    },
    [applyUserState],
  );

  const register = useCallback(
    async (name, email, password) => {
      try {
        const data = await authService.register({ name, email, password });
        applyUserState(data.user);
        return data;
      } catch (error) {
        const mockUser = { id: "mock_user", name, email };
        localStorage.setItem("mock_user_session", JSON.stringify(mockUser));
        applyUserState(mockUser);
        return { success: true, user: mockUser };
      }
    },
    [applyUserState],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("mock_user_session");
      applyUserState(null);
    }
  }, [applyUserState]);

  const hasSolvedProblem = useCallback(
    (problemId) => {
      const normalizedProblemId = Number(problemId);
      return Number.isInteger(normalizedProblemId) && solvedProblems.has(normalizedProblemId);
    },
    [solvedProblems],
  );

  const markProblemSolved = useCallback(
    async (problemId) => {
      const data = await authService.markProblemSolved(problemId);
      if (data?.user) {
        applyUserState(data.user);
      }
      return data;
    },
    [applyUserState],
  );

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    solvedProblems,
    markProblemSolved,
    hasSolvedProblem,
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

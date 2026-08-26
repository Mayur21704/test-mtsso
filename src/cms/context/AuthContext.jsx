import { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("mtsso_admin_token") || "");
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem("mtsso_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Logout handler
  const logout = useCallback((reason = "") => {
    localStorage.removeItem("mtsso_admin_token");
    localStorage.removeItem("mtsso_admin_user");
    setToken("");
    setAdmin(null);
    if (reason === "expired") {
      setSessionExpired(true);
    }
  }, []);

  // Verify active session on load
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("mtsso_admin_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setAdmin(data.admin);
          setToken(storedToken);
          setSessionExpired(false);
        } else {
          // Expired or invalid token
          logout(data.code === "TOKEN_EXPIRED" ? "expired" : "invalid");
        }
      } catch (err) {
        console.error("Session verification error:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [logout]);

  // Login handler
  const login = async (email, password) => {
    setSessionExpired(false);
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Invalid credentials");
    }

    localStorage.setItem("mtsso_admin_token", data.token);
    localStorage.setItem("mtsso_admin_user", JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  // Helper fetch with automatic Bearer token and 401 expiry interception
  const authFetch = useCallback(
    async (url, options = {}) => {
      const currentToken = token || localStorage.getItem("mtsso_admin_token");
      const headers = {
        ...options.headers,
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
      };

      const res = await fetch(url, { ...options, headers });

      if (res.status === 401) {
        let isExpired = true;
        try {
          const body = await res.clone().json();
          if (body.code !== "TOKEN_EXPIRED") isExpired = false;
        } catch {}
        logout("expired");
        // Smoothly redirect to login
        if (typeof window !== "undefined" && !window.location.pathname.includes("/admin/login")) {
          window.location.href = `/admin/login?expired=1&redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }

      return res;
    },
    [token, logout]
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        loading,
        sessionExpired,
        setSessionExpired,
        isAuthenticated: !!token && !!admin,
        login,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

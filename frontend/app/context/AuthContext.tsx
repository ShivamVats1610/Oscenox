"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===========================================
     FETCH USER
  =========================================== */
  const fetchUser = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Auth fetch error:", error);
      setUser(null);
    }
  };

  /* ===========================================
     INITIAL LOAD
  =========================================== */
  useEffect(() => {
    const initAuth = async () => {
      await fetchUser();
      setLoading(false);
    };

    initAuth();
  }, []);

  /* ===========================================
     REFRESH USER (CALL AFTER LOGIN)
  =========================================== */
  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
    setLoading(false);
  };

  /* ===========================================
     LOGOUT
  =========================================== */
  const logout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ===========================================
   CUSTOM HOOK
=========================================== */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

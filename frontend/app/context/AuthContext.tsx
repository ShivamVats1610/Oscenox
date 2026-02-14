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
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔥 Start with false (IMPORTANT)
  const [loading, setLoading] = useState(false);

  /* ===========================================
     FETCH USER
  =========================================== */
  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/users/profile",
        { credentials: "include" }
      );

      if (!res.ok) {
        setUser(null);
      } else {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth fetch error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================
     INITIAL LOAD
  =========================================== */
  useEffect(() => {
    fetchUser();
  }, []);

  /* ===========================================
     REFRESH USER
  =========================================== */
  const refreshUser = async () => {
    await fetchUser();
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
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

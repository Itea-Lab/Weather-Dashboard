"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { AUTH_CONFIG } from "@/lib/authUtils";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
        if (!token) {
          setLoading(false);
          return;
        }

        const csrfToken = localStorage.getItem(AUTH_CONFIG.CSRF_KEY);
        const response = await fetch("/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
            [AUTH_CONFIG.CSRF_HEADER]: csrfToken || "",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
          localStorage.removeItem(AUTH_CONFIG.CSRF_KEY);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
        localStorage.removeItem(AUTH_CONFIG.CSRF_KEY);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_CONFIG.CSRF_KEY, data.csrfToken);
      setUser(data.user);

      router.push("/platform");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.CSRF_KEY);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Error during logout:", e);
    }
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      try {
        // In a real app, verify the token with your backend
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        // Example API call to validate token
        // const response = await fetch('/api/auth/me', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // if (response.ok) {
        //   const userData = await response.json();
        //   setUser(userData);
        // } else {
        //   localStorage.removeItem('token');
        // }

        // For demo, we'll simulate a logged-in user if token exists
        setUser({
          id: "1",
          email: "user@example.com",
          name: "Demo User",
        });
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, call your API
      // const response = await fetch('/api/auth/login', {...});
      // const data = await response.json();
      // localStorage.setItem('token', data.token);

      // For demo purposes
      localStorage.setItem("token", "demo-token");
      setUser({ id: "1", email, name: "Demo User" });
      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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

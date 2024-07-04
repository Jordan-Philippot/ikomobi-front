"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../redux/reducers/authReducer";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      dispatch(setToken(token));
      if (pathname === "/") {
        router.push("/todos");
      }
    } else {
      if (pathname !== "/") {
        router.push("/");
      }
    }
  }, [router]);

  const login = async (username: string, password: string) => {
    try {
      const URI_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
      const response = await axios.post(
        `${URI_ENDPOINT}/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", response.data.token);
      dispatch(setToken(response.data.token));
      setIsAuthenticated(true);
      router.push("/todos");
    } catch (error: any) {
      console.error("Failed to login:", error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch(clearToken());
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

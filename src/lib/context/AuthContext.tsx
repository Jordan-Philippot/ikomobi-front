"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearToken, setToken, setUser } from "../redux/reducers/authReducer";
import useMessage from "../hooks/useMessage";

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

  const { sendSuccess, sendError } = useMessage();

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    if (token && userId) {
      const userIdInt = parseInt(userId);
      setIsAuthenticated(true);
      dispatch(setToken(token));
      dispatch(setUser(userIdInt));

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
      sessionStorage.setItem("userId", response.data.user.id);

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user.id));

      setIsAuthenticated(true);
      router.push("/todos");
      sendSuccess("Login successful");
    } catch (error: any) {
      sendError("Login failed");
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");

    dispatch(clearToken());
    dispatch(setUser(null));

    setIsAuthenticated(false);
    sendSuccess("Logout successful");
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

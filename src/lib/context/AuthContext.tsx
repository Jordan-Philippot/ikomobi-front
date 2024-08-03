"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/authReducer";
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

    if (token) {
      getUser(token).then((response) => {
        if (response && response.data) {
          setIsAuthenticated(true);
          dispatch(
            setUser({
              userId: response.data.user.id,
              username: response.data.user.username,
              token: token,
            })
          );
          if (pathname === "/") {
            router.push("/todos");
          }
        }
      });
    } else if (pathname !== "/") {
      router.push("/");
    }
  }, [router]);

  const getUser = async (token: string) => {
    const URI_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

    try {
      const response = await axios.get(`${URI_ENDPOINT}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const URI_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
      const response = await axios.post(
        `${URI_ENDPOINT}/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", response.data.token);

      dispatch(
        setUser({
          userId: response.data.user.id,
          username: response.data.user.username,
          token: response.data.token,
        })
      );

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

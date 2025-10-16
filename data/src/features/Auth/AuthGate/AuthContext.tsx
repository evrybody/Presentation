"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// import { setTestUser } from "@/store/Auth/setTestUser";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => { //to do: delete for prod
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // setTestUser();
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      if (parsed.isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    if (username === "AwsadnJuw32A2aoq" && password === "PdlawNms23Nk19xm") {
      setIsAuthenticated(true);
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

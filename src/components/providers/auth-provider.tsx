"use client";

import { createContext, useContext, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.origin) return;

      if (event.data.type === "auth" && event.data.token) {
        localStorage.setItem("id_token", event.data.token);
        window.location.reload();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);



  return (
    <AuthContext.Provider value={{ token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
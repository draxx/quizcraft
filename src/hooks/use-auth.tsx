import { useEffect, useState, useRef } from "react";
import { login, logout } from "@/lib/auth";
import { toast } from "sonner";

// Hook used to extract and manage the auth token
export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const token = localStorage.getItem("id_token");
    if (token) {
      setToken(token);
    }

    setAuthReady(true);

    const handleMessage = (event: MessageEvent) => {
      const expectedOrigin = window.location.origin;

      if (
        event.origin === expectedOrigin &&
        event.data?.type === "auth-success" &&
        event.data?.token
      ) {
        localStorage.setItem("id_token", event.data.token);
        setToken(event.data.token);
        toast.success("Connexion réussie !");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    authReady,
    login,
    logout,
  };
}
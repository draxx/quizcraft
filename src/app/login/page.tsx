"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/lib/auth";

export default function LoginPage() {
  useEffect(() => {
    const hasLoggedOut = localStorage.getItem("hasLoggedOut");
    if (hasLoggedOut) {
      toast.success("Déconnexion réussie !");
      localStorage.removeItem("hasLoggedOut");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-md"
        onClick={() => {
          const popup = window.open(
            getLoginUrl(),
            "CognitoLogin",
            "width=500,height=600"
          );

          if (!popup) {
            console.error("Failed to open login popup");
            return;
          }

          const listener = (event: MessageEvent) => {
            if (event.data?.type === "auth-success" && event.data?.token) {
              localStorage.setItem("id_token", event.data.token);
              window.removeEventListener("message", listener);
              popup.close();
              window.location.href = "/questions/list";
            }
          };

          window.addEventListener("message", listener);
        }}
      >
        Connexion
      </button>
    </div>
  );
}

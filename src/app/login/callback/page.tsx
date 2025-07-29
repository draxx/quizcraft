"use client";

import { useEffect } from "react";

import { extractAndStoreToken } from "@/lib/auth";

export default function CallbackPage() {
  useEffect(() => {
    const token = extractAndStoreToken();

    if (token && window.opener) {
      window.opener.postMessage(
        { type: "auth-success", token },
        window.location.origin
      );
    }
  }, []);

  return <p>Authentification en cours...</p>;
}

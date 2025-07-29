"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

// Protects its children by redirecting unauthenticated users to /login
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token, isAuthenticated, authReady } = useAuth();
  const [hasAlreadyRedirected, setHasAlreadyRedirected] = useState(false);

  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated && !hasAlreadyRedirected) {
      console.log(
        "[Auth] Access denied: protected route - user not authenticated."
      );
      setHasAlreadyRedirected(true);
      router.push("/login");
    } else if (isAuthenticated) {
      console.log(
        "[Auth] Access granted: authenticated user accessing protected route."
      );
    }
  }, [authReady, isAuthenticated, hasAlreadyRedirected, router]);

  if (!authReady || (!isAuthenticated && !hasAlreadyRedirected)) {
    return null;
  }

  return <>{children}</>;
};

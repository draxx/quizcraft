"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import ClientOnly from "@/components/client-only";
import Background from "@/components/ui/background";
import Wrapper from "@/components/ui/wrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/navbar";
//import { ProtectedRoute } from "@/components/auth/protected-route";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = pathname.startsWith("/login");
  const { authReady, isAuthenticated } = useAuth();
  const router = useRouter();

  // Bloquer tout rendu tant que l'état d'auth n’est pas connu
  if (!authReady) {
    return (
      <Background>
        <main className="flex-1 flex flex-col items-center justify-center">
          <Wrapper>
            <ClientOnly>Chargement...</ClientOnly>
          </Wrapper>
        </main>
      </Background>
    );
  }

  // Si la page est protégée et l’utilisateur non authentifié, redirection
  if (!isPublicPage && !isAuthenticated) {
    console.log(
        "[Auth] Access denied: protected route - user not authenticated."
      );

    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  // Public page OU page protégée avec utilisateur connecté
  return isPublicPage ? (
    <Background>
      <main className="flex-1 flex flex-col items-center justify-center">
        <Wrapper>
          <ClientOnly>{children}</ClientOnly>
        </Wrapper>
      </main>
    </Background>
  ) : (
    <SidebarProvider>
      <Background>
        <div className="flex min-h-screen">
          <AppSidebar />
          <SidebarTrigger />
          <main className="flex-1 flex flex-col items-center justify-center">
            <Wrapper>
              <ClientOnly>{children}</ClientOnly>
            </Wrapper>
          </main>
        </div>
      </Background>
    </SidebarProvider>
  );
}

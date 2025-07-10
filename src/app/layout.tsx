import "./globals.css";
import ClientOnly from "@/components/client-only";
import Background from "@/components/ui/background";
import Wrapper from "@/components/ui/wrapper";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen antialiased font-sans">
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
      </body>
    </html>
  );
}
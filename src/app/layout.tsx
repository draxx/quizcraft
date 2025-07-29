"use client";

import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import MainLayout from "@/components/layout/main-layout";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen antialiased font-sans">
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
        <Toaster
          richColors
          expand={true}
          theme="dark"
          position="top-right"
          closeButton
          duration={2000}
        />
      </body>
    </html>
  );
}

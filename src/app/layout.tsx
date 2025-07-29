"use client";

import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import MainLayout from "@/components/layout/main-layout";

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
      </body>
    </html>
  );
}

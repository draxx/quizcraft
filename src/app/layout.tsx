import "./globals.css";
import ClientOnly from "@/components/client-only";
import Background from "@/components/ui/background";
import Wrapper from "@/components/ui/wrapper";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="fr" className="dark">
      <body className={`min-h-screen antialiased font-sans`}>
        <Background>
          <Wrapper>
            <ClientOnly>{children}</ClientOnly>
          </Wrapper>
        </Background>
      </body>
    </html>
  );
}

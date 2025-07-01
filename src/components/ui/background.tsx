export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backgrounds/blue-background-1.webp')" }}
    >
      {children}
    </div>
  );
}
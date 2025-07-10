export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgrounds/blue-background-1.webp')" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
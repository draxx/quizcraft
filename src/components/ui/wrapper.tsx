export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-2xl px-2">
      {children}
    </div>
  );
}
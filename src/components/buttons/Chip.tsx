export default function Chip({ children }: { children: React.ReactNode }) {
    return (
      <span className="rounded-full border px-3 py-1 text-xs md:text-sm opacity-80">
        {children}
      </span>
    );
  }
  
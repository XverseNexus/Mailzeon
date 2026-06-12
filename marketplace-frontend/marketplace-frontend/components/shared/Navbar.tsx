// Phase 2 — Full top navbar with notifications bell will be built here.
export function Navbar({ title }: { title?: string }) {
  return (
    <header className="h-16 border-b border-[#374151] bg-[#111827]/50 flex items-center px-6">
      <h1 className="font-semibold text-white">{title ?? 'Dashboard'}</h1>
      <div className="ml-auto w-8 h-8 rounded-full bg-[#374151]" />
    </header>
  );
}

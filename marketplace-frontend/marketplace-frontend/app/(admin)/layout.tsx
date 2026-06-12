// Phase 2 — Full admin sidebar will be built here.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1120] flex">
      <aside className="w-64 bg-[#111827] border-r border-[#374151] hidden md:block" />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

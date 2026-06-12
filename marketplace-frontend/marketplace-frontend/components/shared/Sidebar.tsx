// Phase 2 — Full role-aware sidebar with icons will be built here.
export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#111827] border-r border-[#374151] p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm">M</div>
        <span className="font-semibold text-white">Marketplace</span>
      </div>
      <p className="text-gray-500 text-xs px-2">Navigation — Phase 2</p>
    </aside>
  );
}

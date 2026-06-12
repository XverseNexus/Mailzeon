// Phase 1 — Full login form with email/password will be built here.
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
      <div className="glass-card p-10 w-full max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-purple-400 text-xl">M</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Marketplace</h1>
        <p className="text-gray-400 text-sm mb-8">Login form — coming in Phase 1</p>
        <div className="h-10 bg-[#374151] rounded-lg animate-pulse mb-3" />
        <div className="h-10 bg-[#374151] rounded-lg animate-pulse mb-6" />
        <div className="h-10 bg-purple-600/40 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

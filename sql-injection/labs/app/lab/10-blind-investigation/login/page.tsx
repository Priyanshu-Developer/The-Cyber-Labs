"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function Lab10Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lab10-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/lab/10-blind-investigation/patients");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="mx-auto max-w-md px-6 py-10 pt-20">
        <button onClick={() => router.push("/lab/10-blind-investigation")} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Lab
        </button>
        <div className="rounded-2xl border border-emerald-500/20 bg-[#0b0f17] p-8">
          <h1 className="mb-6 font-mono text-2xl font-bold text-emerald-400">Clinic Portal Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-mono text-white placeholder-zinc-500 outline-none focus:border-emerald-500" placeholder="Enter username" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-mono text-white placeholder-zinc-500 outline-none focus:border-emerald-500" placeholder="Enter password" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2 font-mono text-sm font-bold text-black transition-colors hover:bg-emerald-400 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
            </button>
          </form>
          <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
            <p className="font-mono text-xs text-yellow-400">Hint: Patient lookup only returns Found/Not Found</p>
          </div>
        </div>
      </div>
    </div>
  );
}

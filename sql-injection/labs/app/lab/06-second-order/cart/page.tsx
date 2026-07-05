"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {  UserPlus, LogIn, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/lab06-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Account created! Now login with your credentials.");
        setMode("login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lab06-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/lab/06-second-order/profile");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-10 pt-20">
      <button onClick={() => router.push("/lab/06-second-order")} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-zinc-500">shopsecure-{mode}</span>
        </div>
        <div className="p-6">
          {/* Mode tabs */}
          <div className="mb-6 flex gap-2">
            <button onClick={() => setMode("register")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono ${mode === "register" ? "bg-[#00f3ff]/10 text-[#00f3ff]" : "text-zinc-500 hover:text-white"}`}>
              <UserPlus className="h-3.5 w-3.5" /> Register
            </button>
            <button onClick={() => setMode("login")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono ${mode === "login" ? "bg-[#00f3ff]/10 text-[#00f3ff]" : "text-zinc-500 hover:text-white"}`}>
              <LogIn className="h-3.5 w-3.5" /> Login
            </button>
          </div>

          {message && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#39ff14]/20 bg-[#39ff14]/5 px-4 py-3">
              <span className="text-sm text-[#39ff14]">{message}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}

          {mode === "register" ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]" />
                <p className="mt-1 text-xs text-zinc-600">This value is reused later by profile updates</p>
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]" />
              </div>
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00f3ff] px-4 py-2.5 font-mono text-sm font-bold text-black disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]" />
              </div>
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00f3ff] px-4 py-2.5 font-mono text-sm font-bold text-black disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                Sign In
              </button>
            </form>
          )}

          <div className="mt-4 rounded-lg bg-black/50 p-3 font-mono text-xs text-zinc-500">
            <p>$ <span className="text-[#00f3ff]">{mode === "register" ? "INSERT INTO shop_users ..." : "SELECT * FROM shop_users WHERE ..."}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

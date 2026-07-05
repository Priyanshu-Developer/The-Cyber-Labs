"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, LogIn, AlertCircle, Loader2, Building2 } from "lucide-react";
import HintSystem from "@/app/components/lab-01/HintSystem";

/**
 * Lab 01 - Login Page
 *
 * The vulnerable login form for the Raven Technologies Employee Portal.
 * This is where the SQL Injection attack takes place.
 *
 * The form submits credentials to the vulnerable /api/lab01-login
 * endpoint, which uses string concatenation to build the SQL query.
 */
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/lab01-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to dashboard on successful login
        router.push("/lab/01-auth-bypass/dashboard");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-14">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/5 blur-[120px]" />

      <div className="w-full max-w-lg space-y-6">
        {/* Terminal Header */}
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-zinc-500">
              raven-employee-portal
            </span>
          </div>

          {/* Login Form */}
          <div className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#39ff14]/10">
                <Building2 className="h-5 w-5 text-[#39ff14]" />
              </div>
              <div>
                <h1 className="font-mono text-lg font-bold text-white">
                  Raven Technologies
                </h1>
                <p className="text-xs text-zinc-500">Employee Portal - Internal Access</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter employee username"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-xs text-zinc-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#39ff14] px-4 py-2.5 font-mono text-sm font-bold text-black transition-all hover:bg-[#32d911] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            {/* Terminal output hint */}
            <div className="mt-4 rounded-lg bg-black/50 p-3 font-mono text-xs text-zinc-500">
              <p>$ <span className="text-[#39ff14]">POST</span> /api/lab01-login</p>
              <p className="mt-1">$ <span className="text-zinc-600">Query: SELECT * FROM portal_employees WHERE ...</span></p>
              <p className="mt-1 flex items-center gap-1 text-zinc-600">
                <Terminal className="h-3 w-3" />
                Security audit mode: observe how input changes the question sent to the database.
              </p>
            </div>
          </div>
        </div>

        {/* Hint System */}
        <HintSystem />
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Save, ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; username: string; email: string; role: string } | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/lab06-profile").then((r) => {
      if (!r.ok) { router.push("/lab/06-second-order/cart"); return; }
      return r.json();
    }).then((d) => {
      if (d?.authenticated) {
        setUser(d.user);
        setEmail(d.user.email);
      }
    }).finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/lab06-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Profile updated successfully.");
      } else {
        setError(data.error || "Update failed.");
      }
    } catch {
      setError("Connection error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center pt-14"><Loader2 className="h-8 w-8 animate-spin text-[#00f3ff]" /></div>;

  return (
    <div className="mx-auto max-w-lg px-6 py-10 pt-20">
      <button onClick={() => router.push("/lab/06-second-order/products")} className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </button>

      <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00f3ff]/10">
            <User className="h-6 w-6 text-[#00f3ff]" />
          </div>
          <div>
            <h1 className="font-mono text-lg font-bold text-white">Edit Profile</h1>
            <p className="text-xs text-zinc-500">Update your account information</p>
          </div>
        </div>

        {message && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#39ff14]/20 bg-[#39ff14]/5 px-4 py-3">
            <CheckCircle className="h-4 w-4 text-[#39ff14]" />
            <span className="text-sm text-[#39ff14]">{message}</span>
          </div>
        )}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-400">Username</label>
            <input type="text" value={user?.username || ""} disabled className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-zinc-500" />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-400">Email</label>
            <div className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]" />
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#00f3ff] px-4 py-2.5 font-mono text-sm font-bold text-black disabled:opacity-50">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-black/50 p-3 font-mono text-xs text-zinc-500">
          <p>$ <span className="text-[#00f3ff]">UPDATE shop_users SET email=&apos;...&apos; WHERE username=&apos;stored_username&apos;</span></p>
          <p className="mt-1 text-zinc-600">The stored username is used in this query</p>
        </div>
      </div>
    </div>
  );
}

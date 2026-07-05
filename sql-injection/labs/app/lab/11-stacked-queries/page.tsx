"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Lab11Page() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-black p-8">
        <h1 className="mb-4 font-mono text-3xl font-bold text-amber-400">Lab 11: Stacked Queries</h1>
        <p className="mb-2 text-sm text-zinc-400">Difficulty: Advanced | Time: 50 min</p>
        <p className="mb-6 text-zinc-300">Execute multiple SQL statements by stacking queries to perform batch operations and escalate privileges.</p>
        <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-amber-400">Objective</h3>
          <p className="text-sm text-zinc-400">Use stacked queries to escalate your role from <code className="text-amber-300">guest</code> to <code className="text-amber-300">admin</code> by injecting an UPDATE statement, then access VIP guest notes.</p>
        </div>
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-yellow-400">Technique: Stacked Queries</h3>
          <p className="mb-2 text-sm text-zinc-400">Execute multiple statements using semicolons:</p>
          <code className="block rounded bg-black/50 p-2 text-xs text-yellow-300">
            test&apos;; UPDATE booking_users SET role=&apos;admin&apos; WHERE username=&apos;guest.alice&apos;; --
          </code>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push("/lab/11-stacked-queries/search")} className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2 font-mono text-sm font-bold text-black transition-all hover:bg-amber-400">
            <ArrowRight className="h-4 w-4" /> Start Lab
          </button>
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-400 hover:text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

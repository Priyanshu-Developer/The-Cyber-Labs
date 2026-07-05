"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Lab08Page() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-black p-8">
        <h1 className="mb-4 font-mono text-3xl font-bold text-red-400">Lab 08: Admin Dashboard</h1>
        <p className="mb-2 text-sm text-zinc-400">Difficulty: Intermediate | Time: 30 min</p>
        <p className="mb-6 text-zinc-300">Escalate privileges from a regular user to admin by exploiting UNION-based SQL injection in an employee portal.</p>
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-red-400">Objective</h3>
          <p className="text-sm text-zinc-400">Escalate from a regular user account to <code className="text-red-300">admin</code> role using UNION injection to read the <code className="text-red-300">emp_directory_users</code> table and access restricted admin notes.</p>
        </div>
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-yellow-400">Technique: UNION + Role Escalation</h3>
          <p className="mb-2 text-sm text-zinc-400">Use UNION SELECT to read user data and escalate privileges:</p>
          <code className="block rounded bg-black/50 p-2 text-xs text-yellow-300">
            &apos; UNION SELECT id,username,password,role,5 FROM emp_directory_users --
          </code>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push("/lab/08-admin-dashboard/search")} className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-2 font-mono text-sm font-bold text-white transition-all hover:bg-red-400">
            <ArrowRight className="h-4 w-4" /> Start Lab
          </button>
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-400 hover:text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

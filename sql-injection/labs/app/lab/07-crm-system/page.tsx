"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Lab07Page() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 rounded-2xl border border-[#a855f7]/20 bg-gradient-to-br from-[#a855f7]/10 to-black p-8">
        <h1 className="mb-4 font-mono text-3xl font-bold text-[#a855f7]">Lab 07: CRM System</h1>
        <p className="mb-2 text-sm text-zinc-400">Difficulty: Advanced | Time: 45 min</p>
        <p className="mb-6 text-zinc-300">Leverage error-based injection using double query techniques to dump CRM admin configuration data.</p>
        <div className="mb-6 rounded-lg border border-[#a855f7]/20 bg-[#a855f7]/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-[#a855f7]">Objective</h3>
          <p className="text-sm text-zinc-400">Extract the <code className="text-[#a855f7]">api_secret_key</code> and other sensitive configuration from the <code className="text-[#a855f7]">crm_admin_config</code> table using error-based SQL injection.</p>
        </div>
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-yellow-400">Technique: Double Query Error-Based</h3>
          <p className="mb-2 text-sm text-zinc-400">Force PostgreSQL to return data through error messages using aggregate functions with GROUP BY and ORDER BY:</p>
          <code className="block rounded bg-black/50 p-2 text-xs text-yellow-300">
            &apos; UNION SELECT 1,2,3,4,5 FROM crm_admin_config GROUP BY config_key,config_value,description,5 HAVING 1=1 --
          </code>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push("/lab/07-crm-system/search")} className="flex items-center gap-2 rounded-full bg-[#a855f7] px-6 py-2 font-mono text-sm font-bold text-white transition-all hover:bg-[#9333ea]">
            <ArrowRight className="h-4 w-4" /> Start Lab
          </button>
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-400 hover:text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

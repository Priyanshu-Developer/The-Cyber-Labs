"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Lab09Page() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-black p-8">
        <h1 className="mb-4 font-mono text-3xl font-bold text-cyan-400">Lab 09: API SQL Injection</h1>
        <p className="mb-2 text-sm text-zinc-400">Difficulty: Intermediate | Time: 35 min</p>
        <p className="mb-6 text-zinc-300">Exploit SQL injection vulnerabilities in REST API endpoints that accept JSON payloads.</p>
        <div className="mb-6 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-cyan-400">Objective</h3>
          <p className="text-sm text-zinc-400">Extract sensitive API keys and secrets from the <code className="text-cyan-300">store_admin_secrets</code> table via product search API endpoint.</p>
        </div>
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-yellow-400">Technique: API Injection</h3>
          <p className="mb-2 text-sm text-zinc-400">The search API passes user input directly into SQL. Inject via query parameter:</p>
          <code className="block rounded bg-black/50 p-2 text-xs text-yellow-300">
            GET /api/lab09-search?q=&apos; UNION SELECT 1,secret_name,secret_value,4,5,6,7 FROM store_admin_secrets --
          </code>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push("/lab/09-api-injection/search")} className="flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2 font-mono text-sm font-bold text-black transition-all hover:bg-cyan-400">
            <ArrowRight className="h-4 w-4" /> Start Lab
          </button>
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-400 hover:text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

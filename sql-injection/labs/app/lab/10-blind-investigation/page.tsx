"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Lab10Page() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-black p-8">
        <h1 className="mb-4 font-mono text-3xl font-bold text-emerald-400">Lab 10: Blind SQLi Investigation</h1>
        <p className="mb-2 text-sm text-zinc-400">Difficulty: Advanced | Time: 50 min</p>
        <p className="mb-6 text-zinc-300">Extract sensitive patient data character-by-character when the application only returns &quot;Found&quot; or &quot;Not Found&quot;.</p>
        <div className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-emerald-400">Objective</h3>
          <p className="text-sm text-zinc-400">Extract the SSN of patient <code className="text-emerald-300">PAT-001</code> using boolean-based blind SQL injection. The system only responds with &quot;Found&quot; or &quot;Not Found&quot;.</p>
        </div>
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
          <h3 className="mb-2 font-mono text-sm font-bold text-yellow-400">Technique: Boolean Blind Extraction</h3>
          <p className="mb-2 text-sm text-zinc-400">Use conditional logic to extract data bit by bit:</p>
          <code className="block rounded bg-black/50 p-2 text-xs text-yellow-300">
            PAT-001&apos; AND (SELECT SUBSTRING(ssn,1,1) FROM clinic_patients WHERE patient_id=&apos;PAT-001&apos;) = &apos;1&apos; --
          </code>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push("/lab/10-blind-investigation/patients")} className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 font-mono text-sm font-bold text-black transition-all hover:bg-emerald-400">
            <ArrowRight className="h-4 w-4" /> Start Lab
          </button>
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-2 text-sm text-zinc-400 hover:text-white">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

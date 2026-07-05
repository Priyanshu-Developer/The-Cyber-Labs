"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, Eye, EyeOff } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - Build A Baseline",
    text: "Try a real student number and a fake one. Note the elapsed time before adding any delay.",
  },
  {
    title: "Hint 2 - Conditional Delay",
    text: "In PostgreSQL, CASE WHEN <condition> THEN pg_sleep(3) ELSE pg_sleep(0) END can turn true into a delay.",
  },
  {
    title: "Hint 3 - Extract The Flag",
    text: "Use SUBSTRING against the uni_flags table and test one character position at a time.",
  },
];

export default function Lab05Courses() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ found: boolean; message: string; elapsed: number } | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [showQuery, setShowQuery] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/lab05-courses?student_number=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setResult({ found: data.found, message: data.message, elapsed: data.elapsed });
      } else {
        setError(data.details || data.error || "Search failed");
      }
    } catch {
      setError("Connection failed");
    }
  };

  const normalQuery = `SELECT *\nFROM uni_students\nWHERE student_number = '${"STU-2024-001"}'`;
  const injectedQuery = `SELECT *\nFROM uni_students\nWHERE student_number = '${query}'`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/05-time-based")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-red-400">Registrar Student Probe</h1>
          <p className="text-sm text-zinc-500">Check whether a student number exists</p>
        </div>
        <button onClick={async () => { await fetch("/api/lab05-logout", { method: "POST" }); router.push("/lab/05-time-based/courses"); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter student number (e.g., STU-2024-001)" className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none focus:border-red-500" />
          </div>
          <button type="submit" className="rounded-lg bg-red-500 px-6 py-3 font-mono text-sm font-bold text-white transition-colors hover:bg-red-400">Search</button>
        </div>
      </form>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="The probe uses string concatenation. Use pg_sleep() to create a measurable timing side channel." /></div>}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
        <h2 className="mb-2 font-mono text-sm font-bold text-red-400">Timing Brief</h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          The response text is intentionally boring. Watch elapsed milliseconds instead. A delayed
          response means your injected condition evaluated to true.
        </p>
      </div>

      {searched && !error && result && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{result.message}</p>
          <p className="mt-2 font-mono text-xs text-zinc-400">Elapsed: {result.elapsed} ms</p>
        </div>
      )}

      <div className="mt-8">
        <HintSystem hints={hints} />
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - One Bit At A Time",
    text: "The page only returns Found or Not Found. Treat Found as true and Not Found as false.",
  },
  {
    title: "Hint 2 - Keep One Real Patient",
    text: "Start with a valid patient ID, then append an AND condition. If both are true, the page still says Found.",
  },
  {
    title: "Hint 3 - Extract The Lockbox",
    text: "Use SUBSTRING on the INCIDENT_LOCKBOX row in hospital_confidential and test likely characters until each position is known.",
  },
];

export default function Lab04Patients() {
  const router = useRouter();
  const [patientId, setPatientId] = useState("");
  const [result, setResult] = useState<{ found: boolean; query: string } | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<{ query: string; found: boolean }[]>([]);
  const [showQuery, setShowQuery] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId.trim()) return;
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/lab04-patients?patient_id=${encodeURIComponent(patientId)}`);
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setHistory((prev) => [...prev, { query: patientId, found: data.found }]);
      } else {
        setError(data.details || "Lookup failed");
      }
    } catch {
      setError("Connection failed");
    }
  };

  const normalQuery = `SELECT id, first_name, last_name, patient_id\nFROM hospital_patients\nWHERE patient_id = '${"PAT-001"}'`;
  const injectedQuery = `SELECT id, first_name, last_name, patient_id\nFROM hospital_patients\nWHERE patient_id = '${patientId}'`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/04-boolean-blind")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-yellow-400">Patient Record Lookup</h1>
          <p className="text-sm text-zinc-500">Search by patient ID - returns Found/Not Found only</p>
        </div>
        <button onClick={async () => { await fetch("/api/lab04-logout", { method: "POST" }); router.push("/lab/04-boolean-blind/patients"); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
      </div>

      <form onSubmit={handleLookup} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Enter patient ID (e.g., PAT-001)" className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none focus:border-yellow-400" />
          </div>
          <button type="submit" className="rounded-lg bg-yellow-400 px-6 py-3 font-mono text-sm font-bold text-black transition-colors hover:bg-yellow-300">Lookup</button>
        </div>
      </form>

      <div className="mb-6 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-5">
        <h2 className="mb-2 font-mono text-sm font-bold text-yellow-400">Incident Desk Brief</h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          The response body never prints medical records or SQL errors. Your only signal is whether
          the patient lookup still finds at least one row after your injected condition runs.
        </p>
      </div>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="The patient lookup uses string concatenation. Only Found/Not Found is returned - no data leakage through the response itself." /></div>}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className={`mb-6 rounded-lg border p-4 ${result.found ? "border-yellow-400/20 bg-yellow-400/5" : "border-red-500/20 bg-red-500/5"}`}>
          <div className="flex items-center gap-2">
            {result.found ? (
              <><CheckCircle className="h-5 w-5 text-yellow-400" /><p className="font-mono text-sm text-yellow-400">Patient Found</p></>
            ) : (
              <><XCircle className="h-5 w-5 text-red-400" /><p className="font-mono text-sm text-red-400">Patient Not Found</p></>
            )}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-sm text-zinc-400">Lookup History</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-2">
                <code className="font-mono text-xs text-zinc-400">{h.query}</code>
                <span className={`rounded px-2 py-0.5 text-xs ${h.found ? "bg-yellow-400/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                  {h.found ? "Found" : "Not Found"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <HintSystem hints={hints} />
      </div>
    </div>
  );
}

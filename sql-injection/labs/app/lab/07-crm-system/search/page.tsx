"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, Eye, EyeOff } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - Error-based Extraction",
    text: "The search query uses string concatenation. Force errors that reveal data from other tables.",
  },
  {
    title: "Hint 2 - UNION in Errors",
    text: "Use UNION SELECT to query crm_admin_config directly. The error message will reveal the data.",
  },
  {
    title: "Hint 3 - Direct Query",
    text: "Try: ' UNION SELECT 1,config_key,config_value,4,5 FROM crm_admin_config --",
  },
];

export default function Lab07Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<{ id: number; first_name: string; last_name: string; email: string; company: string; revenue: number; status: string }[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [showQuery, setShowQuery] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setError("");
    try {
      const res = await fetch(`/api/lab07-customers?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setCustomers(data.customers);
      } else {
        setError(data.details || "Search failed");
      }
    } catch {
      setError("Connection failed");
    }
  };

  const normalQuery = `SELECT id, first_name, last_name, email, company, revenue, status\nFROM crm_customers\nWHERE first_name LIKE '%${"John"}%' OR last_name LIKE '%${"John"}%'`;
  const injectedQuery = `SELECT id, first_name, last_name, email, company, revenue, status\nFROM crm_customers\nWHERE first_name LIKE '%${query}%' OR last_name LIKE '%${query}%'`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/07-crm-system")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-[#a855f7]">CRM Customer Search</h1>
          <p className="text-sm text-zinc-500">Search customers by name</p>
        </div>
        <button onClick={async () => { await fetch("/api/lab07-logout", { method: "POST" }); router.push("/lab/07-crm-system/search"); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers by name..." className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none focus:border-[#a855f7]" />
          </div>
          <button type="submit" className="rounded-lg bg-[#a855f7] px-6 py-3 font-mono text-sm font-bold text-white transition-colors hover:bg-[#9333ea]">Search</button>
        </div>
      </form>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="The CRM search uses string concatenation. Error messages can reveal data from other tables." /></div>}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      {searched && !error && (
        <div className="mb-6 rounded-lg border border-[#a855f7]/20 bg-[#a855f7]/5 p-4">
          <p className="font-mono text-sm text-[#a855f7]">Found {customers.length} customers</p>
        </div>
      )}

      <div className="space-y-4">
        {customers.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-[#0b0f17] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-mono text-lg font-semibold text-white">{c.first_name} {c.last_name}</h3>
                <p className="text-sm text-zinc-400">{c.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-400">{c.company}</p>
                <p className="font-mono text-sm text-[#a855f7]">${c.revenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <HintSystem hints={hints} />
      </div>
    </div>
  );
}

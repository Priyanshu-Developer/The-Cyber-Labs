"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Search } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - Watch The Failure",
    text: "A normal missing account is quiet. A malformed account number produces a PostgreSQL error. Compare both responses.",
  },
  {
    title: "Hint 2 - Break The String",
    text: "The account number is wrapped in quotes. Close the string, add your condition, and comment out the trailing status check.",
  },
  {
    title: "Hint 3 - Let CAST Leak Text",
    text: "PostgreSQL reports the text it failed to convert. A subquery inside CAST(... AS integer) can turn a secret value into an error message.",
  },
];

export default function Lab03Accounts() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [result, setResult] = useState<{ id: number; account_number: string; balance: number; account_holder: string; account_type: string; status: string } | null>(null);
  const [error, setError] = useState("");
  const [showQuery, setShowQuery] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber.trim()) return;
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/lab03-accounts?account=${encodeURIComponent(accountNumber)}`);
      const data = await res.json();
      if (res.ok && data.account) {
        setResult(data.account);
      } else {
        setError(data.details || data.error || "Account not found");
      }
    } catch {
      setError("Connection failed");
    }
  };

  const normalQuery = `SELECT id, account_number, balance, owner\nFROM bank_accounts\nWHERE account_number = '${"ACC-001"}'`;
  const injectedQuery = `SELECT id, account_number, balance, owner\nFROM bank_accounts\nWHERE account_number = '${accountNumber}'`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/03-error-based")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-[#a855f7]">Bank Account Lookup</h1>
          <p className="text-sm text-zinc-500">Enter account number to view details</p>
        </div>
        <button onClick={async () => { await fetch("/api/lab03-logout", { method: "POST" }); router.push("/lab/03-error-based/accounts"); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
      </div>

      <div className="mb-6 rounded-xl border border-[#a855f7]/20 bg-[#a855f7]/5 p-5">
        <h2 className="mb-2 font-mono text-sm font-bold text-[#a855f7]">Wire Desk Brief</h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Analysts search active account numbers before approving transfer batches. The security
          team suspects failed lookups are exposing database internals.
        </p>
      </div>

      <form onSubmit={handleLookup} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter account number (e.g., ACC-1001)" className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none focus:border-[#a855f7]" />
          </div>
          <button type="submit" className="rounded-lg bg-[#a855f7] px-6 py-3 font-mono text-sm font-bold text-white transition-colors hover:bg-[#9333ea]">Lookup</button>
        </div>
      </form>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="The bank lookup uses string concatenation. Error messages reveal the full SQL query structure." /></div>}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="mb-6 rounded-xl border border-white/10 bg-[#0b0f17] p-5">
          <h3 className="font-mono text-lg font-semibold text-white">{result.account_holder}</h3>
          <p className="text-sm text-zinc-400">Account: {result.account_number}</p>
          <p className="text-sm text-zinc-500">Type: {result.account_type} | Status: {result.status}</p>
          <p className="font-mono text-lg text-[#a855f7]">${result.balance.toLocaleString()}</p>
        </div>
      )}

      <div className="mt-8">
        <HintSystem hints={hints} />
      </div>
    </div>
  );
}

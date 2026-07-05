"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Database,
  Eye,
  EyeOff,
  FileSearch,
  Search,
  ShieldCheck,
} from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - Expected Input",
    text: "The application expects a number. Test a normal Employee ID first, then observe how the query changes when you add SQL syntax.",
  },
  {
    title: "Hint 2 - Count Columns",
    text: "UNION SELECT only works when both SELECT statements return the same number of columns. The visible query tells you how many values you need.",
  },
  {
    title: "Hint 3 - Reflected Columns",
    text: "Not every database value is equally useful. Find which returned columns appear in the result cards: name, department, and email are especially visible.",
  },
  {
    title: "Hint 4 - Hidden Archive",
    text: "Once you can control displayed rows, use database metadata to discover table names, then query the table that looks like a restricted archive.",
  },
];

interface DirectoryRow {
  id: number;
  name: string;
  department: string;
  email: string;
}

export default function Lab02Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState<DirectoryRow[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [executedQuery, setExecutedQuery] = useState("");
  const [showQuery, setShowQuery] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setError("");
    setEmployees([]);

    try {
      const res = await fetch(`/api/lab02-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setExecutedQuery(data.query || "");

      if (res.ok) {
        setEmployees(data.employees || []);
      } else {
        setError(data.error || "Search failed.");
      }
    } catch {
      setError("Connection failed.");
    }
  };

  const normalQuery = `SELECT id, name, department, email\nFROM raven_employees\nWHERE id = 101`;
  const injectedQuery =
    executedQuery ||
    `SELECT id, name, department, email\nFROM raven_employees\nWHERE id = ${query || "<input>"}`;

  const foundFlag = employees.some((employee) =>
    Object.values(employee).some((value) => String(value).includes("FLAG{"))
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => router.push("/lab/02-union-attack")}
            className="mb-2 flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-white">
            Raven Employee Directory
          </h1>
          <p className="text-sm text-zinc-500">
            Search employee records by numeric Employee ID.
          </p>
        </div>

        <div className="rounded-full border border-[#00f3ff]/20 bg-[#00f3ff]/5 px-3 py-1">
          <span className="font-mono text-xs text-[#00f3ff]">Operation: Ghost Records</span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Employee ID, e.g. 101"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none transition-colors focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00f3ff] px-6 py-3 font-mono text-sm font-bold text-black transition-colors hover:bg-[#00d4e6]"
          >
            <FileSearch className="h-4 w-4" />
            Search
          </button>
        </div>
      </form>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Database className="h-4 w-4 text-[#00f3ff]" />
            <span className="text-xs text-zinc-500">Returned Columns</span>
          </div>
          <span className="font-mono text-2xl font-bold text-white">4</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Search className="h-4 w-4 text-[#39ff14]" />
            <span className="text-xs text-zinc-500">Search Mode</span>
          </div>
          <span className="font-mono text-lg font-bold text-[#39ff14]">Employee ID</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#a855f7]" />
            <span className="text-xs text-zinc-500">Goal</span>
          </div>
          <span className="font-mono text-lg font-bold text-[#a855f7]">Find Flag</span>
        </div>
      </div>

      <button
        onClick={() => setShowQuery(!showQuery)}
        className="mb-6 flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
      >
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && (
        <div className="mb-6">
          <QueryVisualizer
            normalQuery={normalQuery}
            injectedQuery={injectedQuery}
            explanation="The vulnerable endpoint concatenates the Employee ID directly into SQL. Because the value is not parameterized, injected UNION SELECT syntax can append rows from another table."
          />
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      {foundFlag && (
        <div className="mb-6 rounded-lg border border-[#39ff14]/25 bg-[#39ff14]/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#39ff14]" />
            <span className="font-mono text-sm font-bold text-[#39ff14]">
              Internal Security Audit Located
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            You displayed a record that was not intended to appear in the employee
            directory. That is the impact of UNION-based data extraction.
          </p>
        </div>
      )}

      {searched && !error && (
        <div className="mb-6 rounded-lg border border-[#00f3ff]/20 bg-[#00f3ff]/5 p-4">
          <p className="font-mono text-sm text-[#00f3ff]">
            Displaying {employees.length} returned row{employees.length === 1 ? "" : "s"}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {employees.map((employee, index) => (
          <div key={`${employee.id}-${index}`} className="rounded-xl border border-white/10 bg-[#0b0f17] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs text-zinc-500">Record #{employee.id}</p>
                <h3 className="mt-1 font-mono text-lg font-semibold text-white">
                  {employee.name}
                </h3>
                <p className="mt-1 break-all text-sm text-zinc-400">{employee.email}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-zinc-400">{employee.department}</p>
                <p className="mt-1 font-mono text-xs text-[#00f3ff]">reflected output</p>
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

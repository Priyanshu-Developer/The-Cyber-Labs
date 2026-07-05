"use client";

import { useState } from "react";
import { Terminal, Eye, EyeOff } from "lucide-react";

/**
 * Query Visualizer
 *
 * Shows the generated SQL query based on user input.
 * This helps learners understand what happens behind the scenes
 * when they submit the login form.
 *
 * It displays both the normal query and the injected query
 * side by side, highlighting the differences.
 */

interface QueryVisualizerProps {
  username: string;
  password: string;
}

export default function QueryVisualizer({ username, password }: QueryVisualizerProps) {
  const [showRaw, setShowRaw] = useState(false);

  const normalQuery = `SELECT * FROM portal_employees\nWHERE username='${"admin"}' AND password='${"SuperSecret!2024"}'`;

  const injectedQuery = `SELECT * FROM portal_employees\nWHERE username='${username}' AND password='${password}'`;

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#39ff14]" />
          <span className="font-mono text-xs font-bold text-[#39ff14]">
            Generated SQL Query
          </span>
        </div>
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
        >
          {showRaw ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showRaw ? "Hide" : "Show"} Details
        </button>
      </div>

      <div className="p-4 font-mono text-sm">
        <div className="mb-3">
          <span className="text-xs text-zinc-500">Normal query:</span>
          <pre className="mt-1 rounded-lg bg-white/5 p-3 text-[#00f3ff] overflow-x-auto">
            {normalQuery}
          </pre>
        </div>

        <div>
          <span className="text-xs text-zinc-500">Your input creates:</span>
          <pre className="mt-1 rounded-lg bg-red-500/5 p-3 text-red-400 overflow-x-auto border border-red-500/20">
            {injectedQuery}
          </pre>
        </div>

        {showRaw && (
          <div className="mt-4 rounded-lg bg-white/5 p-3">
            <p className="text-xs text-zinc-400 leading-relaxed">
              The vulnerable endpoint uses <code className="text-[#a855f7]">string concatenation</code> to build the SQL query.
              Your input is inserted directly into the query string without escaping or parameterization.
              This allows you to inject SQL syntax that modifies the query logic.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

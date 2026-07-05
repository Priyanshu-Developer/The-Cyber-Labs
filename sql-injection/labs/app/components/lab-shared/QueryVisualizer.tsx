"use client";

import { useState } from "react";
import { Terminal, Eye, EyeOff } from "lucide-react";

interface QueryVisualizerProps {
  normalQuery: string;
  injectedQuery: string;
  explanation?: string;
}

export default function QueryVisualizer({ normalQuery, injectedQuery, explanation }: QueryVisualizerProps) {
  const [showRaw, setShowRaw] = useState(false);

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
          <pre className="mt-1 rounded-lg bg-white/5 p-3 text-[#00f3ff] overflow-x-auto whitespace-pre-wrap">
            {normalQuery}
          </pre>
        </div>

        <div>
          <span className="text-xs text-zinc-500">Your input creates:</span>
          <pre className="mt-1 rounded-lg bg-red-500/5 p-3 text-red-400 overflow-x-auto border border-red-500/20 whitespace-pre-wrap">
            {injectedQuery}
          </pre>
        </div>

        {showRaw && explanation && (
          <div className="mt-4 rounded-lg bg-white/5 p-3">
            <p className="text-xs text-zinc-400 leading-relaxed">
              {explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

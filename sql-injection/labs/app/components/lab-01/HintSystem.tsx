"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

/**
 * Progressive Hint System
 *
 * Three hints that unlock one at a time.
 * Each hint gets progressively more specific about
 * how to exploit the SQL Injection vulnerability.
 */

const hints = [
  {
    title: "Hint 1 - Follow The Input",
    text: "The application sends your username and password directly to the database. Think about where those values land inside the login query.",
  },
  {
    title: "Hint 2 - SQL WHERE Clause",
    text: "The login query checks username AND password. What happens if part of the WHERE condition always evaluates to TRUE?",
  },
  {
    title: "Hint 3 - Comments Matter",
    text: "In SQL, '1'='1' is always true. A comment marker can make the database ignore the rest of a query, including the password check.",
  },
];

export default function HintSystem() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-400" />
          <span className="font-mono text-sm font-bold text-yellow-400">
            Hints ({revealedCount}/{hints.length} revealed)
          </span>
        </div>
        {revealedCount < hints.length && (
          <button
            onClick={() => setRevealedCount((c) => c + 1)}
            className="rounded-full border border-yellow-500/30 px-3 py-1 text-xs font-mono text-yellow-400 transition-colors hover:bg-yellow-500/10"
          >
            Reveal Next Hint
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {hints.map((hint, i) => {
          const revealed = i < revealedCount;
          const open = openIndex === i;

          if (!revealed) {
            return (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-white/5 px-4 py-3 opacity-30"
              >
                <span className="font-mono text-xs text-zinc-500">
                  Hint {i + 1} - Locked
                </span>
              </div>
            );
          }

          return (
            <div key={i} className="rounded-lg border border-yellow-500/20 bg-white/5">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <span className="font-mono text-xs font-semibold text-yellow-300">
                  {hint.title}
                </span>
                {open ? (
                  <ChevronUp className="h-4 w-4 text-yellow-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-yellow-400" />
                )}
              </button>
              {open && (
                <div className="border-t border-yellow-500/10 px-4 py-3">
                  <p className="text-sm leading-relaxed text-zinc-300">{hint.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

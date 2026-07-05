"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, Search, Play } from "lucide-react";
import { labs } from "@/app/data/labs";

type Difficulty = "All" | "Beginner" | "Intermediate" | "Advanced";

const difficultyColors: Record<string, string> = {
  Beginner: "bg-[#39ff14] text-black",
  Intermediate: "bg-[#00f3ff] text-black",
  Advanced: "bg-[#a855f7] text-white",
};

export default function InteractiveLabs() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  const liveCount = labs.filter((lab) => lab.href).length;
  const plannedCount = labs.length - liveCount;

  const filtered = useMemo(() => {
    return labs.filter((lab) => {
      const matchesQuery =
        lab.title.toLowerCase().includes(query.toLowerCase()) ||
        lab.description.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty =
        difficulty === "All" || lab.difficulty === difficulty;
      return matchesQuery && matchesDifficulty;
    });
  }, [query, difficulty]);

  return (
    <section id="labs" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Interactive <span className="text-[#39ff14]">Labs</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Put theory into practice with 20 isolated Docker labs designed to simulate real-world SQL injection scenarios.
          </p>
          <p className="mt-3 font-mono text-xs text-zinc-500">
            {liveCount} live labs · {plannedCount} planned labs
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search labs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 font-mono text-sm text-white placeholder-zinc-500 outline-none focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]"
            />
          </div>

          <div className="flex gap-2">
            {(["All", "Beginner", "Intermediate", "Advanced"] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                  difficulty === d
                    ? "bg-[#39ff14] text-black shadow-[0_0_10px_rgba(57,255,20,0.4)]"
                    : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Lab Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LabCard({ lab, index }: { lab: typeof labs[number]; index: number }) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-[#0b0f17] p-5 backdrop-blur-md transition-all ${
        lab.href
          ? "border-white/10 hover:border-[#39ff14]/30 cursor-pointer"
          : "border-white/5 opacity-60"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-bold",
            difficultyColors[lab.difficulty]
          )}
        >
          {lab.difficulty}
        </span>
        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          {lab.time}
        </div>
      </div>

      <h3 className="mb-1 font-mono text-lg font-semibold text-white">{lab.title}</h3>
      {lab.technique && (
        <span className="mb-2 font-mono text-xs text-[#39ff14]">{lab.technique}</span>
      )}
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">{lab.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {lab.skills.map((skill) => (
          <span
            key={skill}
            className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        {lab.href ? (
          <div className="flex items-center gap-1 rounded-full bg-[#39ff14] px-3 py-1 text-xs font-bold text-black transition-colors group-hover:bg-[#32d911]">
            <Play className="h-3 w-3" /> Launch Lab
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-500">
            Coming Soon
          </div>
        )}
      </div>
    </motion.div>
  );

  if (lab.href) {
    return <a href={lab.href}>{cardContent}</a>;
  }
  return cardContent;
}

"use client";

import { motion } from "framer-motion";
import {
  Database,
  FileCode,
  LockOpen,
  Puzzle,
  AlertCircle,
  EyeOff,
  Clock,
  Binary,
  Map,
  ShieldCheck,
  Code,
} from "lucide-react";
import NeonCard from "./NeonCard";

const objectives = [
  { title: "Understanding SQL", desc: "Learn the fundamental syntax and structure of SQL queries that power modern databases.", Icon: Database, color: "#39ff14" },
  { title: "Database Fundamentals", desc: "Understand how relational databases are structured, indexed, and queried.", Icon: FileCode, color: "#00f3ff" },
  { title: "Authentication Bypass", desc: "Discover how attackers slip past login forms by injecting malicious SQL logic.", Icon: LockOpen, color: "#a855f7" },
  { title: "UNION Attacks", desc: "Combine results from multiple tables using UNION to extract unauthorized data.", Icon: Puzzle, color: "#39ff14" },
  { title: "Error-Based SQLi", desc: "Use error messages as a window into the database schema and contents.", Icon: AlertCircle, color: "#00f3ff" },
  { title: "Blind SQLi", desc: "Learn to exploit databases even when there is no direct error feedback.", Icon: EyeOff, color: "#a855f7" },
  { title: "Time-Based SQLi", desc: "Infer data by leveraging time delays through database sleep functions.", Icon: Clock, color: "#39ff14" },
  { title: "Boolean-Based SQLi", desc: "Extract one bit at a time using true/false conditions in your payloads.", Icon: Binary, color: "#00f3ff" },
  { title: "SQLMap Introduction", desc: "Get hands-on with SQLMap, the industry-standard open-source penetration testing tool.", Icon: Map, color: "#a855f7" },
  { title: "Prevention Techniques", desc: "Implement prepared statements, input validation, and least-privilege access.", Icon: ShieldCheck, color: "#39ff14" },
  { title: "Secure Coding Practices", desc: "Write hardened code that resists injection from the very first line.", Icon: Code, color: "#00f3ff" },
];

export default function WhatYoullLearn() {
  return (
    <section id="learn" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            What You&apos;ll <span className="text-[#39ff14]">Learn</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Build a comprehensive understanding of SQL injection — from basic query structures
            to advanced exploitation techniques and robust defensive coding strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {objectives.map((obj, idx) => (
            <NeonCard key={obj.title} title={obj.title} index={idx} glowColor={obj.color}>
              <div className="flex items-center gap-3">
                <obj.Icon className="h-5 w-5 shrink-0" style={{ color: obj.color }} />
                <p>{obj.desc}</p>
              </div>
            </NeonCard>
          ))}
        </div>
      </div>
    </section>
  );
}

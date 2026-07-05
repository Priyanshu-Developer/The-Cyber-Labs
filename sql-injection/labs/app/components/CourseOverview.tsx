"use client";

import { motion } from "framer-motion";
import {
  Database,
  Layers,
  Code,
  Zap,
  History,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    title: "What SQL Injection is",
    Icon: Database,
    text: "SQL Injection is a code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields for execution. It can expose sensitive data, modify database contents, and, in severe cases, issue operating system commands on the database server.",
  },
  {
    title: "Types of SQL Injection",
    Icon: Layers,
    text: "In-band (Classic), Blind (Inferential), and Out-of-band SQL injection each exploit different database behaviors. Understanding these distinctions is critical for both attackers and defenders.",
  },
  {
    title: "Vulnerable Code Patterns",
    Icon: Code,
    text: "Unsanitized user input concatenated directly into SQL queries is the most common culprit. Frameworks and ORMs can also be vulnerable if used incorrectly.",
  },
  {
    title: "Real-world Impact",
    Icon: Zap,
    text: "From data breaches affecting millions to corporate espionage and financial fraud, SQL injection remains a leading cause of security incidents worldwide.",
  },
  {
    title: "Famous Incidents",
    Icon: History,
    text: "Major breaches such as the 2017 Equifax leaks and countless CMS vulnerabilities started with unsanitized database queries.",
  },
  {
    title: "OWASP Relevance",
    Icon: ShieldAlert,
    text: "Injection flaws, including SQL injection, have consistently ranked in the OWASP Top 10 since its inception, underscoring their persistent danger.",
  },
  {
    title: "Prevention Strategies",
    Icon: ShieldCheck,
    text: "Use parameterized queries, stored procedures, input validation, least-privilege accounts, and modern ORMs. Regular code reviews and automated scanning are essential.",
  },
];

export default function CourseOverview() {
  return (
    <section id="overview" className="relative py-24 px-6 bg-surface-glass">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Course <span className="text-[#a855f7]">Overview</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Gain a holistic understanding of SQL injection — from historical context to state-of-the-art defense mechanisms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((sec, idx) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#a855f7]/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a855f7]/10 text-[#a855f7]">
                <sec.Icon className="h-5 w-5" />
              </div>
              <h3 className="font-mono text-lg font-semibold text-white">
                {sec.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{sec.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Database, MessageCircle, Shield, Terminal, ArrowRight } from "lucide-react";

const DISCORD_INVITE_URL = "https://discord.gg/4g9PJzsqz";

const terminalScenarios = [
  {
    command: "curl -i raven.local/login -d \"username=admin' OR '1'='1' --\"",
    lines: [
      "[INFO] sending crafted authentication request",
      "[SQL] WHERE username='admin' OR '1'='1' --' AND password='...'",
      "[OK] session cookie issued",
    ],
    result: "Access Granted",
    color: "#39ff14",
  },
  {
    command: "python3 labs/union_probe.py --target /employee-search --columns",
    lines: [
      "[INFO] testing ORDER BY 1",
      "[INFO] testing ORDER BY 2",
      "[INFO] testing ORDER BY 3",
      "[FOUND] query returns 4 columns",
    ],
    result: "UNION Path Ready",
    color: "#00f3ff",
  },
  {
    command: "SELECT title, secret_value FROM raven_secret_archive;",
    lines: [
      "[INFO] reading reflected output",
      "[DATA] Internal Security Audit",
      "[FLAG] proof-of-compromise marker recovered",
    ],
    result: "Exploit Understood",
    color: "#a855f7",
  },
];

function TerminalWindow() {
  const [terminalState, setTerminalState] = useState({
    scenarioIndex: 0,
    typedLength: 0,
    visibleLines: 0,
  });
  const { scenarioIndex, typedLength, visibleLines } = terminalState;
  const scenario = terminalScenarios[scenarioIndex];
  const typedCommand = useMemo(
    () => scenario.command.slice(0, typedLength),
    [scenario.command, typedLength]
  );

  useEffect(() => {
    if (typedLength < scenario.command.length) {
      const timer = window.setTimeout(() => {
        setTerminalState((state) => ({
          ...state,
          typedLength: state.typedLength + 1,
        }));
      }, 42);
      return () => window.clearTimeout(timer);
    }

    if (visibleLines < scenario.lines.length) {
      const timer = window.setTimeout(() => {
        setTerminalState((state) => ({
          ...state,
          visibleLines: state.visibleLines + 1,
        }));
      }, 850);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setTerminalState((state) => ({
        scenarioIndex: (state.scenarioIndex + 1) % terminalScenarios.length,
        typedLength: 0,
        visibleLines: 0,
      }));
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [scenario, typedLength, visibleLines]);

  return (
    <div className="relative w-[min(92vw,34rem)] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] p-4 shadow-2xl backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-zinc-500 font-mono">root@thecyberlabs:~</span>
      </div>

      <div className="min-h-[190px] font-mono text-sm leading-6 text-zinc-300">
        <div className="break-words text-[#39ff14]">
          <span className="text-zinc-500">$</span>{" "}
          <span>{typedCommand}</span>
          <motion.span
            className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#39ff14]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="mt-3 space-y-1">
          <AnimatePresence mode="popLayout">
            {scenario.lines.slice(0, visibleLines).map((line) => (
              <motion.p
                key={`${scenario.command}-${line}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="text-zinc-400"
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {visibleLines === scenario.lines.length && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2"
          >
            <span
              className="h-2 w-2 rounded-full shadow-[0_0_12px_currentColor]"
              style={{ backgroundColor: scenario.color, color: scenario.color }}
            />
            <span className="font-bold" style={{ color: scenario.color }}>
              {scenario.result}
            </span>
          </motion.div>
        )}

        <div className="absolute bottom-3 right-4 flex gap-1">
          {terminalScenarios.map((item, index) => (
            <span
              key={item.command}
              className="h-1.5 w-6 rounded-full transition-colors"
              style={{
                backgroundColor:
                  index === scenarioIndex ? item.color : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      {/* scanning line */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 h-px bg-[#39ff14]/40 shadow-[0_0_10px_rgba(57,255,20,0.5)]"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/5 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f3ff]/5 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 w-fit backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">20 Hands-On Labs</span>
          </div>

          <h1 className="font-mono text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
            SQL
            <br />
            <span className="text-[#39ff14]">Injection</span>
          </h1>

          <p className="max-w-xl text-lg leading-8 text-zinc-400">
            Master the art and defense of one of the most critical web vulnerabilities.
            Through immersive, Docker-based labs, you will learn to identify, exploit, and
            mitigate SQL Injection attacks in real-world scenarios.
          </p>

          <p className="max-w-xl text-sm leading-6 text-zinc-500">
            SQL Injection allows attackers to interfere with the queries an application
            makes to its database. By understanding how injection works, you gain the power
            to build truly secure applications and defend against the most persistent threats.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="#learn"
              className="inline-flex items-center gap-2 rounded-full bg-[#39ff14] px-8 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-[#32d911] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            >
              Start Learning <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#labs"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 font-mono text-sm font-medium text-white transition-all hover:border-[#00f3ff] hover:text-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
            >
              Launch Labs
            </a>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#5865f2]/50 bg-[#5865f2]/10 px-8 py-3 font-mono text-sm font-medium text-[#d7dcff] transition-all hover:border-[#5865f2] hover:bg-[#5865f2]/20 hover:text-white hover:shadow-[0_0_15px_rgba(88,101,242,0.35)]"
            >
              Ask Queries <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative z-20 scale-110 md:scale-100">
            <TerminalWindow />
          </div>
          {/* Decorative floating elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 top-20 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
          >
            <Database className="h-6 w-6 text-[#a855f7]" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 bottom-20 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
          >
            <Shield className="h-6 w-6 text-[#00f3ff]" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
          >
            <Terminal className="h-6 w-6 text-[#39ff14]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

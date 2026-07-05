import { Shield, Clock, Target, ArrowRight, Database, Terminal, Building2, LockKeyhole } from "lucide-react";

/**
 * Lab 01 - Landing Page
 *
 * Introduction to the Authentication Bypass lab.
 * Explains the story, objectives, and how to get started.
 */
export default function LabLandingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Lab Badge */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#39ff14]/10">
          <Shield className="h-5 w-5 text-[#39ff14]" />
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-500">Lab 01</span>
          <h1 className="font-mono text-2xl font-bold text-white">
            Raven Technologies Employee Portal
          </h1>
        </div>
      </div>

      {/* Meta Info */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5 text-[#00f3ff]" />
          <span className="text-xs font-mono text-zinc-400">Difficulty: Beginner</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Clock className="h-3.5 w-3.5 text-[#a855f7]" />
          <span className="text-xs font-mono text-zinc-400">Est. 15-20 min</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Database className="h-3.5 w-3.5 text-yellow-400" />
          <span className="text-xs font-mono text-zinc-400">PostgreSQL</span>
        </div>
      </div>

      {/* Story */}
      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">The Story</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-400">
          <p className="mb-4">
            <strong className="text-white">Raven Technologies</strong> recently migrated its legacy
            employee portal to a new internal web application.
          </p>
          <p className="mb-4">
            A junior developer was asked to quickly rebuild the login page before an internal
            security audit. The team insists, <span className="text-white">&quot;We sanitize everything.&quot;</span>
          </p>
          <p>
            An anonymous insider sent your team a message: <strong className="text-[#39ff14]">
            Sometimes asking the database the right question is enough.</strong> Your mission is
            to determine whether authentication can be bypassed without valid credentials.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Mission Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: LockKeyhole, title: "Bypass Authentication", text: "Gain access without knowing employee credentials." },
            { icon: Building2, title: "Reach Dashboard", text: "Confirm access to internal employee resources." },
            { icon: Shield, title: "Find The Flag", text: "Locate the hidden audit proof after login." },
          ].map((objective) => (
            <div key={objective.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <objective.icon className="mb-3 h-5 w-5 text-[#39ff14]" />
              <h3 className="font-mono text-sm font-bold text-white">{objective.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{objective.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Learning Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "What SQL Injection is",
            "How SQL queries are constructed",
            "Authentication logic vulnerabilities",
            "SQL WHERE clause manipulation",
            "Login bypass techniques",
            "SQL comments",
            "Why string concatenation is dangerous",
            "How parameterized queries prevent attacks",
          ].map((obj) => (
            <div key={obj} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39ff14]" />
              <span className="text-sm text-zinc-300">{obj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge */}
      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Your Challenge</h2>
        <div className="space-y-3">
          {[
            "Inspect the login page and understand how it works",
            "Identify how user input affects the SQL query",
            "Craft an SQL Injection payload to bypass authentication",
            "Access the employee dashboard",
            "Explore authenticated-only pages",
            "Find the hidden internal audit flag",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#39ff14]/10 font-mono text-xs font-bold text-[#39ff14]">
                {i + 1}
              </span>
              <span className="text-sm text-zinc-300">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Rules of Engagement</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Do not modify application files while solving.",
              "Do not brute force credentials.",
              "Do not use automated scanners.",
              "Everything required exists inside this lab.",
            ].map((rule) => (
              <div key={rule} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-300">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Button */}
      <a
        href="/lab/01-auth-bypass/login"
        className="inline-flex items-center gap-2 rounded-full bg-[#39ff14] px-8 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-[#32d911] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
      >
        <Terminal className="h-4 w-4" />
        Start Lab
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

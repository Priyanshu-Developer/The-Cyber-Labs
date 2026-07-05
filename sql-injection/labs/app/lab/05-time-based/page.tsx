import {
  ArrowRight,
  Clock,
  Database,
  GraduationCap,
  Radar,
  Target,
  Terminal,
} from "lucide-react";

export default function Lab05Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 pt-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
          <GraduationCap className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-500">Lab 05</span>
          <h1 className="font-mono text-2xl font-bold text-white">
            UniPortal Night Registrar
          </h1>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5 text-red-400" />
          <span className="font-mono text-xs text-zinc-400">Difficulty: Advanced</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Clock className="h-3.5 w-3.5 text-[#a855f7]" />
          <span className="font-mono text-xs text-zinc-400">Est. 60-75 min</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Radar className="h-3.5 w-3.5 text-[#00f3ff]" />
          <span className="font-mono text-xs text-zinc-400">Time-based blind SQLi</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">The Story</h2>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-400">
          <p>
            UniPortal runs a late-night registrar tool used during enrollment freezes. The endpoint
            never displays hidden data, and errors are swallowed by the application.
          </p>
          <p>
            Students can check whether a student number exists. The only unusual behavior is that
            some requests take longer than others.
          </p>
          <p>
            Your mission is to prove whether response time alone can reveal the registrar&apos;s hidden
            emergency flag.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Mission Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Establish a normal response-time baseline.",
            "Create a request that delays only when a condition is true.",
            "Use conditional pg_sleep calls as a yes/no signal.",
            "Infer the registrar flag one character at a time.",
            "Recover the full FLAG value from the hidden admin table.",
            "Explain why silent errors do not stop blind SQL injection.",
          ].map((objective) => (
            <div key={objective} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <span className="text-sm text-zinc-300">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Target Query</h2>
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-red-300">
{`SELECT *
FROM uni_students
WHERE student_number = '<user_input>';`}
          </pre>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            No secret text is reflected. Timing is the only reliable side channel.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Database className="h-4 w-4 text-red-400" />
          <h2 className="font-mono text-sm font-bold text-red-400">Success Condition</h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          Recover the hidden registrar flag from <code className="text-red-300">uni_flags</code>.
        </p>
      </section>

      <a
        href="/lab/05-time-based/courses"
        className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-3 font-mono text-sm font-bold text-white transition-all hover:bg-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]"
      >
        <Terminal className="h-4 w-4" />
        Start Timing Probe
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

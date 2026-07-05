import {
  ArrowRight,
  Clock,
  Database,
  FileSearch,
  Target,
  Terminal,
} from "lucide-react";

export default function LabLanding() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 pt-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00f3ff]/10">
          <FileSearch className="h-5 w-5 text-[#00f3ff]" />
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-500">Lab 02</span>
          <h1 className="font-mono text-2xl font-bold text-white">
            Operation: Ghost Records
          </h1>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5 text-[#00f3ff]" />
          <span className="font-mono text-xs text-zinc-400">Difficulty: Beginner</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Clock className="h-3.5 w-3.5 text-[#a855f7]" />
          <span className="font-mono text-xs text-zinc-400">Est. 20-30 min</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Database className="h-3.5 w-3.5 text-yellow-400" />
          <span className="font-mono text-xs text-zinc-400">UNION-based SQLi</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">The Story</h2>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-400">
          <p>
            Congratulations on gaining access to the Raven Technologies employee portal.
            During your investigation, you discover another internal application used by
            Human Resources to search employee records.
          </p>
          <p>
            The HR team insists, <span className="text-white">&quot;Employees can only search by Employee ID, so there&apos;s no risk.&quot;</span>
            A developer quietly admits the search feature was built years ago and nobody
            has touched it since.
          </p>
          <p>
            A whistleblower left one final clue: <strong className="text-[#00f3ff]">
            The search box knows more than it should.</strong>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Mission Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Investigate the employee search feature.",
            "Determine how many columns the query returns.",
            "Identify which columns are reflected in the webpage.",
            "Use UNION SELECT to display unintended data.",
            "Find the internal table hidden elsewhere in the database.",
            "Recover the secret audit flag.",
          ].map((objective) => (
            <div
              key={objective}
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00f3ff]" />
              <span className="text-sm text-zinc-300">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Target Query</h2>
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-[#00f3ff]">
{`SELECT id,
       name,
       department,
       email
FROM raven_employees
WHERE id = <user_input>;`}
          </pre>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            The developers believed numeric input made this safe. Your job is to test
            that assumption carefully.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Rules of Engagement</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Do not modify server files while solving.",
            "Do not brute force.",
            "Do not use automated SQL injection tools.",
            "Observe every response carefully.",
          ].map((rule) => (
            <div key={rule} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-300">
              {rule}
            </div>
          ))}
        </div>
      </section>

      <a
        href="/lab/02-union-attack/search"
        className="inline-flex items-center gap-2 rounded-full bg-[#00f3ff] px-8 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-[#00d4e6] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
      >
        <Terminal className="h-4 w-4" />
        Start Investigation
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

import {
  ArrowRight,
  Clock,
  Database,
  EyeOff,
  HeartPulse,
  Target,
  Terminal,
} from "lucide-react";

export default function Lab04Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 pt-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
          <HeartPulse className="h-5 w-5 text-yellow-400" />
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-500">Lab 04</span>
          <h1 className="font-mono text-2xl font-bold text-white">
            MediRecord Incident Desk
          </h1>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5 text-yellow-400" />
          <span className="font-mono text-xs text-zinc-400">Difficulty: Intermediate+</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Clock className="h-3.5 w-3.5 text-[#a855f7]" />
          <span className="font-mono text-xs text-zinc-400">Est. 45-60 min</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <EyeOff className="h-3.5 w-3.5 text-[#00f3ff]" />
          <span className="font-mono text-xs text-zinc-400">Boolean blind SQLi</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">The Story</h2>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-400">
          <p>
            BankSecure led you to a harder assignment: <strong className="text-white">MediRecord</strong>,
            a hospital incident desk that exposes almost no visible data from its patient lookup.
          </p>
          <p>
            The lookup only says whether a patient ID exists. No records are printed, and database
            errors are hidden from the user. The security team believes that means sensitive tables
            are safe.
          </p>
          <p>
            Your job is to prove whether true and false responses alone can reveal the confidential
            incident lockbox phrase used by the hospital response team.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Mission Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Investigate the patient lookup response pattern.",
            "Build true and false tests without seeing query output.",
            "Use substring checks to infer one character at a time.",
            "Confirm the confidential table contains an incident lockbox row.",
            "Recover the lockbox phrase from blind responses.",
            "Document why hiding errors is not enough to stop injection.",
          ].map((objective) => (
            <div
              key={objective}
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
              <span className="text-sm text-zinc-300">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Target Query</h2>
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-yellow-300">
{`SELECT *
FROM hospital_patients
WHERE patient_id = '<user_input>';`}
          </pre>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            The response only reveals whether at least one row matched. That single bit is still
            enough to ask the database many precise questions.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Rules of Engagement</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Do not modify server files while solving.",
            "Do not brute force login credentials.",
            "Do not use automated SQL injection tools.",
            "Rely only on Found and Not Found responses.",
          ].map((rule) => (
            <div key={rule} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-300">
              {rule}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Database className="h-4 w-4 text-yellow-400" />
          <h2 className="font-mono text-sm font-bold text-yellow-400">Success Condition</h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          Extract the complete <code className="text-yellow-300">INCIDENT_LOCKBOX</code> value
          from <code className="text-yellow-300">hospital_confidential</code> using boolean
          inference only.
        </p>
      </section>

      <a
        href="/lab/04-boolean-blind/patients"
        className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.35)]"
      >
        <Terminal className="h-4 w-4" />
        Start Investigation
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

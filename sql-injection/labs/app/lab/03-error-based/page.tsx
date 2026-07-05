import {
  ArrowRight,
  AlertTriangle,
  Clock,
  Database,
  Landmark,
  Target,
  Terminal,
} from "lucide-react";

export default function Lab03Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 pt-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a855f7]/10">
          <Landmark className="h-5 w-5 text-[#a855f7]" />
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-500">Lab 03</span>
          <h1 className="font-mono text-2xl font-bold text-white">
            BankSecure Wire Desk
          </h1>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5 text-[#a855f7]" />
          <span className="font-mono text-xs text-zinc-400">Difficulty: Intermediate</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Clock className="h-3.5 w-3.5 text-[#00f3ff]" />
          <span className="font-mono text-xs text-zinc-400">Est. 35-45 min</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Database className="h-3.5 w-3.5 text-yellow-400" />
          <span className="font-mono text-xs text-zinc-400">Error-based SQLi</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">The Story</h2>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-400">
          <p>
            After the Raven Technologies audit, your team is contracted by
            <strong className="text-white"> BankSecure</strong>, a regional bank preparing its
            wire-transfer desk for a compliance review.
          </p>
          <p>
            The desk lets analysts look up active accounts before approving high-value
            transfers. A failed lookup sometimes shows a raw database complaint, and the
            operations lead is worried that those errors expose more than troubleshooting text.
          </p>
          <p>
            Your authorization is narrow: prove whether a normal account lookup can reveal
            the protected emergency configuration bundle.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Mission Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Investigate the account lookup form.",
            "Trigger a controlled PostgreSQL error.",
            "Use the error response to understand the query shape.",
            "Confirm which table stores emergency bank configuration.",
            "Extract both protected secrets from the configuration table.",
            "Explain why exposing raw database errors increases impact.",
          ].map((objective) => (
            <div
              key={objective}
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]" />
              <span className="text-sm text-zinc-300">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Target Query</h2>
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-[#a855f7]">
{`SELECT *
FROM bank_accounts
WHERE account_number = '<user_input>'
AND status = 'active';`}
          </pre>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            The application treats account numbers as trusted strings and returns database
            error details to the browser.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Rules of Engagement</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            "Do not modify server files while solving.",
            "Do not brute force account numbers.",
            "Do not use automated SQL injection tools.",
            "Use only the account lookup workflow.",
          ].map((rule) => (
            <div key={rule} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-300">
              {rule}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <h2 className="font-mono text-sm font-bold text-yellow-400">Success Condition</h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          Recover the values for <code className="text-yellow-300">db_master_password</code> and
          <code className="text-yellow-300"> api_secret_key</code> from the protected bank
          configuration data.
        </p>
      </section>

      <a
        href="/lab/03-error-based/accounts"
        className="inline-flex items-center gap-2 rounded-full bg-[#a855f7] px-8 py-3 font-mono text-sm font-bold text-white transition-all hover:bg-[#9333ea] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
      >
        <Terminal className="h-4 w-4" />
        Start Investigation
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

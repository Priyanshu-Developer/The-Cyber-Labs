import {
  ArrowRight,
  Clock,
  Database,
  PackageSearch,
  Repeat2,
  ShieldAlert,
  Target,
  Terminal,
} from "lucide-react";

export default function Lab06Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 pt-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00f3ff]/10">
          <PackageSearch className="h-5 w-5 text-[#00f3ff]" />
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-500">Lab 06</span>
          <h1 className="font-mono text-2xl font-bold text-white">
            CyberShop Fulfillment Portal
          </h1>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Target className="h-3.5 w-3.5 text-[#00f3ff]" />
          <span className="font-mono text-xs text-zinc-400">Difficulty: Advanced</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Clock className="h-3.5 w-3.5 text-[#a855f7]" />
          <span className="font-mono text-xs text-zinc-400">Est. 50-65 min</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Repeat2 className="h-3.5 w-3.5 text-yellow-400" />
          <span className="font-mono text-xs text-zinc-400">Second-order SQLi</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">The Story</h2>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-zinc-400">
          <p>
            CyberShop&apos;s fulfillment portal accepts new customer registrations and lets users
            update their profile before placing orders.
          </p>
          <p>
            Registration itself appears boring: the account is created and nothing unusual happens.
            But a support engineer warns that profile updates reuse stored account fields in a
            legacy SQL statement.
          </p>
          <p>
            Your goal is to plant a payload that sleeps quietly in the database, then wakes up when
            the profile update job runs and leaks the hidden fulfillment flag.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Mission Objectives</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Create a customer account with a stored SQL payload.",
            "Log in normally with that new account.",
            "Trigger the second-order sink from the profile editor.",
            "Use the delayed execution point to read admin note data.",
            "Recover the fulfillment flag from shop_admin_notes.",
            "Explain why validation at only one workflow step is not enough.",
          ].map((objective) => (
            <div key={objective} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00f3ff]" />
              <span className="text-sm text-zinc-300">{objective}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-mono text-lg font-bold text-white">Second-order Flow</h2>
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm text-[#00f3ff]">
{`1. Register account -> username is stored
2. Log in -> stored username is loaded
3. Update profile -> stored username is concatenated into SQL
4. Database executes the payload later`}
          </pre>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Nothing needs to fire during registration. That delay is what makes the bug harder to
            spot in reviews and logs.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-[#00f3ff]/20 bg-[#00f3ff]/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Database className="h-4 w-4 text-[#00f3ff]" />
          <h2 className="font-mono text-sm font-bold text-[#00f3ff]">Success Condition</h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          Recover the <code className="text-[#00f3ff]">FULFILLMENT_FLAG</code> value from
          <code className="text-[#00f3ff]"> shop_admin_notes</code>.
        </p>
      </section>

      <section className="mb-10 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-yellow-400" />
          <h2 className="font-mono text-sm font-bold text-yellow-400">Rule Reminder</h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          Use the app workflows only: register, log in, edit profile, and observe the response.
        </p>
      </section>

      <a
        href="/lab/06-second-order/products"
        className="inline-flex items-center gap-2 rounded-full bg-[#00f3ff] px-8 py-3 font-mono text-sm font-bold text-black transition-all hover:bg-[#00d4e6] hover:shadow-[0_0_20px_rgba(0,243,255,0.35)]"
      >
        <Terminal className="h-4 w-4" />
        Start Fulfillment Test
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

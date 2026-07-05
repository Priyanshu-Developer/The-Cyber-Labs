import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, FileKey2, ShieldCheck, TriangleAlert } from "lucide-react";
import { validateSession } from "@/app/lab/01-auth-bypass/lib/lab-db";

const FLAG = "FLAG{raven_login_bypass_audit}";

export default async function FlagPage() {
  const token = (await cookies()).get("lab01_session")?.value;

  if (!token) {
    redirect("/lab/01-auth-bypass/login");
  }

  const employee = await validateSession(token);

  if (!employee) {
    redirect("/lab/01-auth-bypass/login");
  }

  const isAdmin = employee.role === "admin";

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 pt-20">
      <Link
        href="/lab/01-auth-bypass/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#00f3ff]/10">
            <FileKey2 className="h-6 w-6 text-[#00f3ff]" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-zinc-500">
              Raven Technologies Restricted Archive
            </p>
            <h1 className="mt-1 font-mono text-2xl font-bold text-white">
              Internal Audit Flag
            </h1>
          </div>
        </div>

        {isAdmin ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-[#39ff14]/25 bg-[#39ff14]/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#39ff14]" />
                <span className="font-mono text-sm font-bold text-[#39ff14]">
                  Administrator Access Confirmed
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                This proof-of-compromise record is visible only after an administrator
                session is established.
              </p>
            </div>

            <div className="rounded-lg border border-[#00f3ff]/25 bg-black/50 p-5">
              <p className="mb-2 font-mono text-xs text-zinc-500">audit_flag.txt</p>
              <code className="break-all font-mono text-lg font-bold text-[#00f3ff]">
                {FLAG}
              </code>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 text-yellow-400" />
              <span className="font-mono text-sm font-bold text-yellow-400">
                Admin Clearance Required
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">
              You are authenticated, but this archive requires administrator clearance.
              Revisit the login query and think like the database.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

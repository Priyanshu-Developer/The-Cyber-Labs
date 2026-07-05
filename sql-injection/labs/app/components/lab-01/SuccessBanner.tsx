"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, Shield, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

/**
 * Success Banner
 *
 * Displayed after the learner successfully bypasses authentication.
 * Shows a congratulatory message and an educational explanation
 * of why the attack worked and how to prevent it.
 */

export default function SuccessBanner() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5">
      {/* Success Header */}
      <div className="flex items-center gap-3 border-b border-[#39ff14]/20 px-6 py-4">
        <CheckCircle className="h-6 w-6 text-[#39ff14]" />
        <div>
          <h3 className="font-mono text-lg font-bold text-[#39ff14]">Mission Complete</h3>
          <p className="text-sm text-zinc-400">
            You reached an administrator session without valid credentials. Now find the audit flag.
          </p>
        </div>
      </div>

      {/* Explanation Toggle */}
      <div className="px-6 py-4">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:border-[#39ff14]/30"
        >
          <span className="font-mono text-sm font-semibold text-white">
            Learn: Why did this attack work?
          </span>
          {showExplanation ? (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          )}
        </button>

        {showExplanation && (
          <div className="mt-4 space-y-4">
            {/* The Attack */}
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="font-mono text-sm font-bold text-red-400">
                  The Vulnerability
                </span>
              </div>
              <pre className="font-mono text-xs text-red-300 overflow-x-auto">
{`-- Your payload:
admin' OR '1'='1' --

-- The resulting SQL:
SELECT * FROM portal_employees
WHERE username='admin' OR '1'='1' --' AND password='anything'

-- The -- comments out the password check
-- '1'='1' is always TRUE
-- So the query returns ALL employees
-- The first result (admin) is used for the session.`}
              </pre>
            </div>

            {/* Why It Works */}
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="font-mono text-sm font-bold text-yellow-400">
                  Why It Works
                </span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>1. The query uses <code className="text-[#a855f7]">string concatenation</code> to build the SQL string.</li>
                <li>2. User input is placed directly into the query without escaping.</li>
                <li>3. The <code className="text-[#a855f7]">&apos; OR &apos;1&apos;=&apos;1&apos;</code> makes the WHERE clause always TRUE.</li>
                <li>4. The <code className="text-[#a855f7]">--</code> comments out the password check.</li>
                <li>5. The database returns the first matching row (the admin account).</li>
              </ul>
            </div>

            {/* The Fix */}
            <div className="rounded-lg border border-[#39ff14]/20 bg-[#39ff14]/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#39ff14]" />
                <span className="font-mono text-sm font-bold text-[#39ff14]">
                  The Fix: Parameterized Queries
                </span>
              </div>
              <pre className="font-mono text-xs text-[#39ff14] overflow-x-auto">
{`// SECURE: Using parameterized query with pg
const result = await pool.query(
  'SELECT * FROM portal_employees WHERE username=$1 AND password=$2',
  [username, password]
);

// The database driver handles escaping.
// Even if username contains: admin' OR '1'='1' --
// The database treats it as a LITERAL STRING, not SQL syntax.`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

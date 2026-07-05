"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * Lab 01 - Logout Page
 *
 * Clears the session and redirects to the login page.
 */
export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await fetch("/api/lab01-logout", { method: "POST" });
      router.push("/lab/01-auth-bypass/login");
    }
    logout();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center pt-14">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#39ff14]" />
        <p className="font-mono text-sm text-zinc-500">Logging out...</p>
      </div>
    </div>
  );
}

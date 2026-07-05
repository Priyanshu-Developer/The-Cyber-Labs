"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Shield,
  LogOut,
  Loader2,
  AlertCircle,
  User,
  FileSearch,
  LockKeyhole,
} from "lucide-react";
import SuccessBanner from "@/app/components/lab-01/SuccessBanner";

/**
 * Lab 01 - Dashboard Page
 *
 * The employee portal dashboard. Displays a list of all employees.
 * This is the page the learner reaches after bypassing authentication.
 *
 * If the user logged in as "admin", a success banner and flag trail are displayed.
 */

interface Employee {
  id: number;
  employee_id: string;
  username: string;
  full_name: string;
  email: string;
  department: string;
  role: string;
  phone: string;
  hire_date: string;
  salary: number;
  clearance_level: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        // Check session
        const sessionRes = await fetch("/api/lab01-session");
        if (!sessionRes.ok) {
          router.push("/lab/01-auth-bypass/login");
          return;
        }
        const sessionData = await sessionRes.json();
        setEmployee(sessionData.employee);

        // Fetch all employees
        const empRes = await fetch("/api/lab01-employees");
        if (empRes.ok) {
          const empData = await empRes.json();
          setEmployees(empData.employees);
        }
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/lab01-logout", { method: "POST" });
    router.push("/lab/01-auth-bypass/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-14">
        <Loader2 className="h-8 w-8 animate-spin text-[#39ff14]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-14">
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      </div>
    );
  }

  const isAdmin = employee?.role === "admin";
  const displayName = isAdmin ? "Administrator" : employee?.full_name;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 pt-20">
      {/* Success banner for admin bypass */}
      {isAdmin && <SuccessBanner />}

      {/* Dashboard Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold text-white">
            Employee Dashboard
          </h1>
          <p className="text-sm text-zinc-500">
            Welcome,{" "}
            <span className="font-mono text-[#00f3ff]">{displayName}</span>
            {" "}({employee?.role})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/lab/01-auth-bypass/profile"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-zinc-400 transition-colors hover:border-[#00f3ff] hover:text-[#00f3ff]"
          >
            <User className="h-3.5 w-3.5" />
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-zinc-400 transition-colors hover:border-red-500 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {isAdmin && (
        <section className="mb-8 rounded-xl border border-[#00f3ff]/20 bg-[#00f3ff]/5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <FileSearch className="mt-1 h-5 w-5 shrink-0 text-[#00f3ff]" />
              <div>
                <h2 className="font-mono text-sm font-bold text-[#00f3ff]">
                  Security Audit Notice
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  Congratulations! You managed to access an account without valid credentials.
                  The audit team left a proof-of-compromise record in the restricted archive.
                </p>
              </div>
            </div>
            <a
              href="/lab/01-auth-bypass/flag"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#00f3ff]/30 bg-[#00f3ff]/10 px-4 py-2 font-mono text-xs font-bold text-[#00f3ff] transition-colors hover:bg-[#00f3ff]/15"
            >
              <LockKeyhole className="h-3.5 w-3.5" />
              Restricted Archive
            </a>
          </div>
        </section>
      )}

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#39ff14]" />
            <span className="text-xs text-zinc-500">Total Employees</span>
          </div>
          <span className="font-mono text-2xl font-bold text-white">{employees.length}</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#a855f7]" />
            <span className="text-xs text-zinc-500">Your Clearance</span>
          </div>
          <span className="font-mono text-2xl font-bold text-[#a855f7]">
            Level {employee?.clearance_level}
          </span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#00f3ff]" />
            <span className="text-xs text-zinc-500">Division</span>
          </div>
          <span className="font-mono text-lg font-bold text-[#00f3ff]">
            {employee?.department}
          </span>
        </div>
      </div>

      {/* Employee Table */}
      <section>
        <h2 className="mb-4 font-mono text-lg font-bold text-white">
          Employee Directory
        </h2>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 text-left text-xs text-zinc-500">ID</th>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">Name</th>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">Department</th>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">Role</th>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">Email</th>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">Phone</th>
                <th className="px-4 py-3 text-left text-xs text-zinc-500">Clearance</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-4 py-3 text-[#39ff14]">{emp.employee_id}</td>
                  <td className="px-4 py-3 text-white">{emp.full_name}</td>
                  <td className="px-4 py-3 text-zinc-400">{emp.department}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        emp.role === "admin"
                          ? "bg-red-500/10 text-red-400"
                          : emp.role === "hr_manager"
                            ? "bg-[#a855f7]/10 text-[#a855f7]"
                            : "bg-[#00f3ff]/10 text-[#00f3ff]"
                      }`}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{emp.email}</td>
                  <td className="px-4 py-3 text-zinc-500">{emp.phone}</td>
                  <td className="px-4 py-3 text-[#a855f7]">{emp.clearance_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

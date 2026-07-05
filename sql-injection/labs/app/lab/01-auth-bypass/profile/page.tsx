"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Shield,
  ArrowLeft,
  Loader2,
} from "lucide-react";

/**
 * Lab 01 - Profile Page
 *
 * Displays the currently authenticated employee's profile.
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

export default function ProfilePage() {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/lab01-session");
        if (!res.ok) {
          router.push("/lab/01-auth-bypass/login");
          return;
        }
        const data = await res.json();
        setEmployee(data.employee);
      } catch {
        router.push("/lab/01-auth-bypass/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading || !employee) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-14">
        <Loader2 className="h-8 w-8 animate-spin text-[#39ff14]" />
      </div>
    );
  }

  const fields = [
    { icon: User, label: "Employee ID", value: employee.employee_id, color: "#39ff14" },
    { icon: Mail, label: "Email", value: employee.email, color: "#00f3ff" },
    { icon: Phone, label: "Phone", value: employee.phone, color: "#a855f7" },
    { icon: Building2, label: "Department", value: employee.department, color: "#39ff14" },
    { icon: Shield, label: "Role", value: employee.role, color: "#00f3ff" },
    { icon: Calendar, label: "Hire Date", value: employee.hire_date, color: "#a855f7" },
    {
      icon: DollarSign,
      label: "Salary",
      value: `$${employee.salary.toLocaleString()}`,
      color: "#39ff14",
    },
    { icon: Shield, label: "Clearance Level", value: `Level ${employee.clearance_level}`, color: "#00f3ff" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 pt-20">
      <button
        onClick={() => router.push("/lab/01-auth-bypass/dashboard")}
        className="mb-6 flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      {/* Profile Card */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        {/* Avatar + Name */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#39ff14]/10 font-mono text-xl font-bold text-[#39ff14]">
            {employee.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold text-white">
              {employee.full_name}
            </h1>
            <p className="text-sm text-zinc-500">
              @{employee.username} &middot; {employee.department}
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <field.icon className="h-4 w-4 shrink-0" style={{ color: field.color }} />
              <div>
                <p className="text-xs text-zinc-500">{field.label}</p>
                <p className="font-mono text-sm text-white">{field.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

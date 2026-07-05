"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

/**
 * Lab Navigation Bar
 *
 * Displays lab title and navigation links for the Employee Portal.
 * Shows the Raven Technologies branding (the fictional target company).
 */
export default function LabNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="/lab/01-auth-bypass" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#39ff14]" />
          <span className="font-mono text-sm font-bold text-white tracking-wider">
            RAVEN<span className="text-[#00f3ff]">PORTAL</span>
          </span>
        </a>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
          <span className="text-xs font-mono text-zinc-400">Lab 01 - SQL Injection</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/lab/01-auth-bypass/login"
            className="text-xs font-mono text-zinc-400 transition-colors hover:text-white"
          >
            Portal Login
          </a>
          <Link
            href="/"
            className="text-xs font-mono text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Exit Lab
          </Link>
        </div>
      </div>
    </nav>
  );
}

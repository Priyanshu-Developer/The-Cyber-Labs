"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

interface LabNavbarProps {
  labNumber: number;
  labName: string;
  brandName: string;
  brandColor: string;
  loginPath: string;
  navLabel?: string;
}

export default function LabNavbar({ labNumber, labName, brandName, brandColor, loginPath, navLabel = "Portal Login" }: LabNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href={`/lab/${labNumber < 10 ? "0" : ""}${labNumber}-${labName}`} className="flex items-center gap-2">
          <Shield className="h-5 w-5" style={{ color: brandColor }} />
          <span className="font-mono text-sm font-bold text-white tracking-wider">
            {brandName}
          </span>
        </a>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: brandColor }} />
          <span className="text-xs font-mono text-zinc-400">Lab {labNumber} - SQL Injection</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={loginPath}
            className="text-xs font-mono text-zinc-400 transition-colors hover:text-white"
          >
            {navLabel}
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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MessageCircle, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DISCORD_INVITE_URL = "https://discord.gg/4g9PJzsqz";

const navLinks = [
  { label: "Start Learning", href: "#hero" },
  { label: "View Learning Path", href: "#journey" },
  { label: "Launch Labs", href: "#labs" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#050505]/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="The Cyber Labs logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            priority
          />
          <span className="font-mono text-xl font-bold text-white tracking-wider">
            THE CYBER <span className="text-[#00f3ff]">LABS</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#39ff14] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#5865f2]/40 bg-[#5865f2]/10 px-4 py-2 font-mono text-xs font-bold text-[#cdd3ff] transition-all hover:border-[#5865f2] hover:bg-[#5865f2]/20 hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Ask Queries
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/10 bg-[#050505]/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-zinc-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-[#5865f2]/40 bg-[#5865f2]/10 px-4 py-2 font-mono text-xs font-bold text-[#cdd3ff] transition-all hover:border-[#5865f2] hover:bg-[#5865f2]/20 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Ask Queries on Discord
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

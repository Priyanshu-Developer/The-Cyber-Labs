"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Terminal, Shield } from "lucide-react";

const DISCORD_INVITE_URL = "https://discord.gg/4g9PJzsqz";

export default function CallToAction() {
  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a855f7]/5 blur-[100px]" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <Terminal className="h-8 w-8 text-[#39ff14]" />
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-[#39ff14] to-transparent" />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <Shield className="h-8 w-8 text-[#a855f7]" />
            </div>
          </div>

          <h2 className="font-mono text-4xl font-extrabold text-white md:text-6xl">
            Ready to Master{" "}
            <span className="text-[#39ff14]">SQL Injection</span>?
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            Begin your hands-on cybersecurity training journey today. With 20 immersive Docker
            labs, guided walkthroughs, and a structured learning path, you will gain the skills
            to identify, exploit, and prevent SQL injection vulnerabilities like a professional.
            When you get stuck, join the Discord community and ask your queries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#labs"
              className="inline-flex items-center gap-2 rounded-full bg-[#39ff14] px-10 py-4 font-mono text-base font-bold text-black transition-all hover:bg-[#32d911] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            >
              Start Now <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#5865f2]/50 bg-[#5865f2]/10 px-10 py-4 font-mono text-base font-medium text-[#d7dcff] transition-all hover:border-[#5865f2] hover:bg-[#5865f2]/20 hover:text-white"
            >
              Ask Queries on Discord <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

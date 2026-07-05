"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeonCardProps {
  title: string;
  index?: number;
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g., "#39ff14"
}

export default function NeonCard({
  title,
  index,
  children,
  className,
  glowColor = "#39ff14",
}: NeonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index ? index * 0.05 : 0 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300",
        className
      )}
      style={
        {
          // We inject hover shadow with CSS using data attribute or just class
          // We'll use a pseudo-element for glow using Tailwind arbitrary values
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}22, transparent 60%)`,
        }}
      />
      <h3 className="relative z-10 mb-2 font-mono text-lg font-bold text-white">
        {title}
      </h3>
      <div className="relative z-10 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
      <div
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: glowColor }}
      />
      <div className="absolute -left-px top-1/2 h-0 w-px -translate-y-1/2 bg-white/20 transition-all duration-500 group-hover:h-full" />
    </motion.div>
  );
}

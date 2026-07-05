"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  "Basics","SQL Fundamentals","Vulnerability Discovery",
  "Exploitation","Advanced Techniques","Automation",
  "Defense","Real-world Scenarios","CTF Challenges","Final Assessment",
];

export default function LearningJourney() {
  return (
    <section id="journey" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Learning <span className="text-[#00f3ff]">Journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            A curated roadmap that takes you from SQL basics to mastering the art of injection defense.
          </p>
        </motion.div>

        <div className="relative flex flex-col gap-10">
          {/* Vertical center line */}
          <div className="absolute inset-y-0 left-8 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "relative flex items-center gap-6",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Card */}
                <div className="ml-16 w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#39ff14]/40 md:ml-0 md:w-[45%]">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#39ff14]/10 font-mono text-sm font-bold text-[#39ff14]">
                      {i + 1}
                    </span>
                    <h3 className="font-mono text-lg font-semibold text-white">
                      {step}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Deep dive into {step.toLowerCase()} with hands-on labs and real-world scenarios.
                  </p>
                </div>

                {/* Timeline node on the line */}
                <div className="absolute left-8 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.5)] md:left-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

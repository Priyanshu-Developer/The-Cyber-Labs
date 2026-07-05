"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Crosshair, Eye, Shield } from "lucide-react";

const storySteps = [
  {
    Icon: Eye,
    title: "The Scenario",
    text: "Every lab begins with a realistic story. You are a penetration tester hired by a company to assess the security of their web applications.",
    color: "#39ff14",
  },
  {
    Icon: Target,
    title: "Your Mission",
    text: "Identify vulnerabilities, exploit weaknesses, and extract sensitive data — all within a controlled, ethical environment.",
    color: "#00f3ff",
  },
  {
    Icon: Crosshair,
    title: "The Attack",
    text: "Using SQL injection techniques, you will manipulate input fields, craft malicious payloads, and bypass authentication mechanisms.",
    color: "#a855f7",
  },
  {
    Icon: BookOpen,
    title: "The Learning",
    text: "After exploitation, detailed walkthroughs explain how each vulnerability works and how to fix it permanently.",
    color: "#39ff14",
  },
  {
    Icon: Shield,
    title: "The Defense",
    text: "Apply what you learned by writing secure code that prevents SQL injection in production applications.",
    color: "#00f3ff",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Story-Based <span className="text-[#a855f7]">Learning</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Every lab is built around a realistic scenario. You play the role of a penetration tester
            investigating a vulnerable application in a professional engagement.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-[#39ff14]/50 via-[#a855f7]/50 to-[#00f3ff]/50 md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {storySteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-center"
                >
                  {/* Node on the line */}
                  <div
                    className="absolute left-8 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/10 bg-[#050505]"
                    style={{ top: "50%", transform: "translate(-50%, -50%)" }}
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 w-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors md:ml-0 md:w-[45%] ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                    style={{ borderColor: `${step.color}22` }}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${step.color}15` }}
                      >
                        <step.Icon className="h-5 w-5" style={{ color: step.color }} />
                      </div>
                      <h3 className="font-mono text-lg font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Server,
  Terminal,
  RotateCcw,
  BookOpen,
  Lightbulb,
  BarChart3,
  Trophy,
  Laptop,
  CloudOff,
} from "lucide-react";

const features = [
  {
    Icon: Server,
    title: "Docker-Based Isolated Labs",
    desc: "Each lab runs in its own isolated Docker container, ensuring safety and reproducibility.",
    color: "#39ff14",
  },
  {
    Icon: Terminal,
    title: "Interactive Terminal",
    desc: "Full terminal access within each lab. Execute commands, craft payloads, and interact with the environment in real time.",
    color: "#00f3ff",
  },
  {
    Icon: RotateCcw,
    title: "Instant Reset",
    desc: "Reset any lab to its original state with a single click. Experiment freely without consequences.",
    color: "#a855f7",
  },
  {
    Icon: BookOpen,
    title: "Guided Walkthroughs",
    desc: "Step-by-step guides walk you through each technique, ensuring you understand every action.",
    color: "#39ff14",
  },
  {
    Icon: Lightbulb,
    title: "Hints System",
    desc: "Stuck? Progressive hints guide you toward the solution without spoiling the learning experience.",
    color: "#00f3ff",
  },
  {
    Icon: BarChart3,
    title: "Progress Tracking",
    desc: "Track your completion across all 20 labs and monitor your skill development over time.",
    color: "#a855f7",
  },
  {
    Icon: Trophy,
    title: "Achievement Badges",
    desc: "Earn badges as you complete labs and master new techniques. Build your cybersecurity portfolio.",
    color: "#39ff14",
  },
  {
    Icon: Laptop,
    title: "Local Execution",
    desc: "All labs run on your local machine. No cloud dependency means faster access and full control.",
    color: "#00f3ff",
  },
  {
    Icon: CloudOff,
    title: "No Cloud Dependency",
    desc: "Your data stays on your machine. Perfect for offline learning and corporate training environments.",
    color: "#a855f7",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6 bg-surface-glass">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-mono text-4xl font-bold text-white md:text-5xl">
            Platform <span className="text-[#00f3ff]">Features</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Everything you need for an immersive, professional cybersecurity training experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-[#00f3ff]/40"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${feat.color}15` }}
              >
                <feat.Icon className="h-6 w-6" style={{ color: feat.color }} />
              </div>
              <h3 className="font-mono text-lg font-semibold text-white">
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feat.desc}
              </p>
              <div
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: feat.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

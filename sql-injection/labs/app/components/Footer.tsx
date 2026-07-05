"use client";

import Image from "next/image";

const DISCORD_INVITE_URL = "https://discord.gg/4g9PJzsqz";

const footerLinks = {
  "Learning Resources": [
    { label: "SQL Injection Guide", href: "#" },
    { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
    { label: "SQLMap Documentation", href: "https://sqlmap.org/" },
    { label: "PortSwigger Academy", href: "https://portswigger.net/web-security" },
  ],
  Documentation: [
    { label: "Getting Started", href: "#" },
    { label: "Lab Setup Guide", href: "#" },
    { label: "Docker Requirements", href: "#" },
    { label: "Troubleshooting", href: "#" },
  ],
  Community: [
    { label: "FAQ", href: "#" },
    { label: "Ask Queries on Discord", href: DISCORD_INVITE_URL, external: true },
    { label: "GitHub", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#" className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="The Cyber Labs logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <span className="font-mono text-xl font-bold text-white tracking-wider">
                THE CYBER <span className="text-[#00f3ff]">LABS</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-zinc-500">
              Professional cybersecurity training through immersive, hands-on Docker-based
              laboratories. Master offensive and defensive security techniques.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-mono text-sm font-bold text-white">
                {title}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noreferrer" : undefined}
                      className="text-sm text-zinc-500 transition-colors hover:text-[#39ff14]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} The Cyber Labs. Built for ethical security education.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-zinc-600 transition-colors hover:text-[#39ff14]">
              Terms
            </a>
            <a href="#" className="text-xs text-zinc-600 transition-colors hover:text-[#39ff14]">
              Privacy
            </a>
            <a href="#" className="text-xs text-zinc-600 transition-colors hover:text-[#39ff14]">
              Responsible Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

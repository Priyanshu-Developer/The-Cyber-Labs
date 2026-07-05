import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SQL Injection Training | The Cyber Labs",
  description:
    "Master SQL Injection through hands-on Docker-based labs. Learn offensive security techniques, database exploitation, and defensive strategies in an immersive, professional environment.",
  keywords: [
    "SQL Injection",
    "Cybersecurity",
    "Penetration Testing",
    "Docker Labs",
    "OWASP",
    "Security Training",
  ],
  authors: [{ name: "The Cyber Labs" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-zinc-300">
        {children}
      </body>
    </html>
  );
}

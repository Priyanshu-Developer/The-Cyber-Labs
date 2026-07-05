import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-01/LabNavbar";

/**
 * Lab 01 Layout
 *
 * Wraps all lab pages with the shared background animation
 * and navigation bar. Uses the root layout's fonts and globals.
 */
export const metadata: Metadata = {
  title: "Lab 01 - Raven Employee Portal | The Cyber Labs",
  description:
    "Hands-on SQL Injection lab: bypass Raven Technologies employee portal authentication.",
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LabBackground />
      <LabNavbar />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

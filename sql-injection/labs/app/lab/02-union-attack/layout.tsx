import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 02 - Operation: Ghost Records | The Cyber Labs",
  description: "Extract hidden Raven Technologies records using UNION-based SQL injection.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={2}
        labName="union-attack"
        brandName="RAVENDIR"
        brandColor="#00f3ff"
        loginPath="/lab/02-union-attack/search"
        navLabel="Employee Search"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

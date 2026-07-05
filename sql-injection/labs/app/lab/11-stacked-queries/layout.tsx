import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 11 - Stacked Queries | The Cyber Labs",
  description: "Stacked queries SQL injection for batch operations.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={11}
        labName="stacked-queries"
        brandName="HOTELVIP"
        brandColor="#f59e0b"
        loginPath="/lab/11-stacked-queries/search"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

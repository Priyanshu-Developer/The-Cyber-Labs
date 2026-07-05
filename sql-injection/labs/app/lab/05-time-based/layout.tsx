import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 05 - Time-based Blind SQLi | The Cyber Labs",
  description: "Steal admin credentials using response delays.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={5}
        labName="time-based"
        brandName="UNIPORTAL"
        brandColor="#ef4444"
        loginPath="/lab/05-time-based/courses"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

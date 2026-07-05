import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 10 - Blind SQLi Investigation | The Cyber Labs",
  description: "Blind SQL injection with no output feedback.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={10}
        labName="blind-investigation"
        brandName="CLINICSEC"
        brandColor="#10b981"
        loginPath="/lab/10-blind-investigation/patients"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

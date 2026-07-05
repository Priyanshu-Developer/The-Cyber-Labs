import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 04 - Boolean Blind SQLi | The Cyber Labs",
  description: "Extract data using only true/false responses.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={4}
        labName="boolean-blind"
        brandName="MEDIRECORD"
        brandColor="#facc15"
        loginPath="/lab/04-boolean-blind/patients"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

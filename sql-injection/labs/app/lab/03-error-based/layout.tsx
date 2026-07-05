import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 03 - Error-based SQLi | The Cyber Labs",
  description: "Force database errors to leak admin configuration data.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={3}
        labName="error-based"
        brandName="BANKSECURE"
        brandColor="#a855f7"
        loginPath="/lab/03-error-based/accounts"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

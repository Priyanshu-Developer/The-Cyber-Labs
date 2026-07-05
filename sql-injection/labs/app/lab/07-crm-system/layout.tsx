import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 07 - CRM System | The Cyber Labs",
  description: "Error-based double query SQL injection in a CRM system.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={7}
        labName="crm-system"
        brandName="CRMFORCE"
        brandColor="#a855f7"
        loginPath="/lab/07-crm-system/search"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

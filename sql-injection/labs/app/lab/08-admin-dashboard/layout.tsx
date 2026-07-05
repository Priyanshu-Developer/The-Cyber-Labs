import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 08 - Admin Dashboard | The Cyber Labs",
  description: "UNION-based SQL injection with role escalation.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={8}
        labName="admin-dashboard"
        brandName="EMPDIR"
        brandColor="#ef4444"
        loginPath="/lab/08-admin-dashboard/search"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

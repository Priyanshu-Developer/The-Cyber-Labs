import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 09 - API SQL Injection | The Cyber Labs",
  description: "SQL injection via REST API with JSON payloads.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={9}
        labName="api-injection"
        brandName="STOREAPI"
        brandColor="#06b6d4"
        loginPath="/lab/09-api-injection/search"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

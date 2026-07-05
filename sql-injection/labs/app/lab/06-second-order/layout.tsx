import type { Metadata } from "next";
import LabBackground from "@/app/components/lab-01/LabBackground";
import LabNavbar from "@/app/components/lab-shared/LabNavbar";

export const metadata: Metadata = {
  title: "Lab 06 - Second-order SQLi | The Cyber Labs",
  description: "Inject via registration, trigger during profile update.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabBackground />
      <LabNavbar
        labNumber={6}
        labName="second-order"
        brandName="CYBERSHOP"
        brandColor="#00f3ff"
        loginPath="/lab/06-second-order/products"
      />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}

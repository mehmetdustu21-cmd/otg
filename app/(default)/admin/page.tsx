import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin-panel";

export const metadata: Metadata = {
  title: "Yönetici girişi | Orchard to Global",
  robots: { index: false, follow: false, noarchive: true }
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminPanel />;
}

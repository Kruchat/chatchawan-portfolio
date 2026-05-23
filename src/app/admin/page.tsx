import { redirect } from "next/navigation";
import { AdminCms } from "@/components/AdminCms";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminCmsData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await getAdminCmsData();

  return <AdminCms data={data} />;
}

import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminAuthConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  invalid: "รหัสผ่านไม่ถูกต้อง ลองตรวจอีกครั้งครับ",
  config: "ยังไม่ได้ตั้งค่า ADMIN_PASSWORD หรือ ADMIN_SESSION_SECRET บน server",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;
  const configured = isAdminAuthConfigured();

  return (
    <main className="min-h-screen bg-[#17130d] px-5 py-10 text-[#f7f5ef] sm:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.86fr]">
        <section>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#d6ccbd]" href="/">
            Portfolio
          </Link>
          <p className="mt-10 font-mono text-xs font-bold uppercase text-[#f6c453]">
            Secure backoffice
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
            Admin login for your portfolio CMS and hiring requests.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d6ccbd]">
            หน้านี้ใช้ session cookie ฝั่ง server สำหรับแก้เนื้อหาเว็บ แพ็กเกจบริการ ผลงาน
            ช่องทางติดต่อ และคำขอจ้างงาน โดยไม่เปิดเผย service key ไปที่ browser
          </p>
        </section>

        <section className="rounded-md border border-white/10 bg-[#f7f5ef] p-5 text-[#17130d] shadow-2xl">
          <div className="mb-6 flex items-start gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-[#17130d] text-[#f7f5ef]">
              <Lock size={20} />
            </span>
            <div>
              <p className="font-mono text-sm font-bold uppercase text-[#7a6c5d]">Admin</p>
              <h2 className="mt-1 text-2xl font-semibold">Sign in</h2>
            </div>
          </div>

          {!configured ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              ยังไม่ได้ตั้งค่า environment สำหรับ login
            </div>
          ) : null}

          {error ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              {errorMessages[error] ?? errorMessages.invalid}
            </div>
          ) : null}

          <form action="/api/admin/login" method="post" className="grid gap-4">
            <label className="field-label">
              Admin password
              <input
                className="field-input"
                name="password"
                placeholder="Enter admin password"
                required
                type="password"
              />
            </label>
            <button className="primary-action" type="submit">
              <KeyRound size={18} />
              Login
            </button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-md bg-white p-4 text-sm leading-6 text-[#5a5044]">
            <ShieldCheck className="mt-1 shrink-0 text-emerald-700" size={18} />
            <p>
              Cookie เป็น HttpOnly, SameSite=Lax และ Secure ใช้เพื่อป้องกันหน้า
              `/admin` โดยเฉพาะ
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

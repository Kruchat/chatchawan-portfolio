import { BriefcaseBusiness, Languages } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/lib/cms";
import { locales, localizedPath, type Locale } from "@/lib/i18n";

const languageLabels: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  zh: "中文",
};

export function SiteHeader({
  locale,
  content,
  currentPath,
}: {
  locale: Locale;
  content: SiteContent;
  currentPath: string;
}) {
  const navItems = [
    { href: "/about", label: content.nav.about },
    { href: "/services", label: content.nav.services },
    { href: "/#projects", label: content.nav.projects },
    { href: "/#contact", label: content.nav.contact },
  ];

  return (
    <header className="relative z-20 border-b border-[#17130d]/10 bg-[#f7f5ef]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link href={localizedPath(locale, "/")} className="flex items-center gap-3" aria-label="Chatchawan portfolio home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#17130d] text-sm font-semibold text-[#f7f5ef]">
            CT
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase text-[#17130d]">Chatchawan T.</span>
            <span className="block text-xs font-medium text-[#6d6255]">Next.js / Supabase / AI systems</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap items-center gap-1 text-sm font-semibold text-[#6d6255]">
            {navItems.map((item) => (
              <Link className="nav-link" href={localizedPath(locale, item.href)} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="primary-action min-h-10 px-3 py-2 text-sm" href={localizedPath(locale, "/#hire")}>
            <BriefcaseBusiness size={16} />
            {content.nav.hire}
          </Link>
          <div className="inline-flex items-center gap-1 rounded-md border border-[#17130d]/15 bg-white/70 p-1 text-sm font-semibold shadow-sm">
            <span className="grid h-8 w-8 place-items-center text-[#6d6255]" aria-hidden="true">
              <Languages size={16} />
            </span>
            {locales.map((nextLocale) => (
              <Link
                className={
                  nextLocale === locale
                    ? "rounded-md bg-[#17130d] px-2.5 py-1.5 text-[#f7f5ef]"
                    : "rounded-md px-2.5 py-1.5 text-[#6d6255] transition hover:bg-[#17130d]/8 hover:text-[#17130d]"
                }
                href={localizedPath(nextLocale, currentPath)}
                hrefLang={nextLocale}
                key={nextLocale}
              >
                {languageLabels[nextLocale]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Languages } from "lucide-react";
import { locales, localizedPath, type Locale } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  zh: "中文",
};

export function LanguageSwitcher({
  currentLocale,
  currentPath,
}: {
  currentLocale: Locale;
  currentPath: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-[#17130d]/15 bg-white/70 p-1 text-sm font-semibold shadow-sm backdrop-blur">
      <span className="grid h-8 w-8 place-items-center text-[#6d6255]" aria-hidden="true">
        <Languages size={16} />
      </span>
      {locales.map((locale) => (
        <Link
          className={
            locale === currentLocale
              ? "rounded-md bg-[#17130d] px-2.5 py-1.5 text-[#f7f5ef]"
              : "rounded-md px-2.5 py-1.5 text-[#6d6255] transition hover:bg-[#17130d]/8 hover:text-[#17130d]"
          }
          href={localizedPath(locale, currentPath)}
          hrefLang={locale}
          key={locale}
        >
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}

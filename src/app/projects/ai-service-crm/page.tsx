import type { Metadata } from "next";
import { AiServiceCrmPageContent } from "@/components/AiServiceCrmPageContent";
import { getProjectPageCopy } from "@/lib/i18n";
import { getDemoOverview } from "@/lib/demo-backoffice";

const copy = getProjectPageCopy("en");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: copy.metadataTitle,
  description: copy.metadataDescription,
};

export default async function AiServiceCrmPage() {
  const overview = await getDemoOverview();

  return <AiServiceCrmPageContent locale="en" overview={overview} />;
}

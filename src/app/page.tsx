import { HomePage } from "@/components/HomePage";
import { getPublicSiteData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const site = await getPublicSiteData("en");

  return <HomePage locale="en" site={site} />;
}

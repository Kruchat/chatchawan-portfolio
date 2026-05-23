import { NextResponse } from "next/server";
import { getDemoOverview } from "@/lib/demo-backoffice";

export const dynamic = "force-dynamic";

export async function GET() {
  const overview = await getDemoOverview();
  return NextResponse.json(overview);
}

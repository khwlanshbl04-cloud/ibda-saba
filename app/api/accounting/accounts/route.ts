import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireSession();
  if (!auth.session) return auth.response;
  const accounts = await prisma.account.findMany({ where: { active: true }, orderBy: { code: "asc" }, select: { id: true, code: true, name: true, type: true, currencyId: true, currency: { select: { code: true } } } });
  return NextResponse.json({ accounts });
}

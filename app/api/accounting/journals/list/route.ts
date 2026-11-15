import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireSession();
  if (!auth.session) return auth.response;
  const entries = await prisma.journalEntry.findMany({ orderBy: { entryDate: "desc" }, take: 20, include: { lines: { include: { account: { select: { code: true, name: true } }, currency: { select: { code: true } } } }, postedBy: { select: { fullName: true } } } });
  return NextResponse.json({ entries });
}

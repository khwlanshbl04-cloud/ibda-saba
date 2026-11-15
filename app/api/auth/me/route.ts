import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.id }, select: { id: true, username: true, fullName: true, role: true, active: true } });
  if (!user?.active) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user });
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!username || !password || username.length > 100 || password.length > 200) {
      return NextResponse.json({ error: "أدخل اسم المستخدم وكلمة المرور" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    const valid = user?.active && await bcrypt.compare(password, user.passwordHash);
    if (!valid || !user) return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });

    const token = await createSession({ id: user.id, username: user.username, role: user.role });
    const response = NextResponse.json({ user: { id: user.id, username: user.username, fullName: user.fullName, role: user.role } });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "تعذر تسجيل الدخول؛ تحقق من إعداد قاعدة البيانات" }, { status: 500 });
  }
}

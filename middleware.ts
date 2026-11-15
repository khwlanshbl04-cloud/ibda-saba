import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = () => {
  const value = process.env.SESSION_SECRET;
  return value && value.length >= 32 ? new TextEncoder().encode(value) : null;
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/api/") || path.startsWith("/_next/") || path === "/favicon.ico") return NextResponse.next();
  const token = request.cookies.get("ibda_session")?.value;
  const key = secret();
  if (token && key) {
    try {
      await jwtVerify(token, key);
      if (path === "/login") return NextResponse.redirect(new URL("/", request.url));
      return NextResponse.next();
    } catch { /* Invalid/expired cookie: require login. */ }
  }
  if (path === "/login") return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/((?!.*\\.).*)"] };

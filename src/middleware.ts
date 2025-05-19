import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname === "/" || pathname === "/login" || pathname === "/signup";
  const isChatPage = pathname.startsWith("/chat");

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (!user && isChatPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // update user's auth session
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

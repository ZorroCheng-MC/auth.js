import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  if (
    !token &&
    (pathname.startsWith("/sample-records") ||
      pathname.startsWith("/collect-files"))
  ) {
    const url = new URL("/api/auth/signin", request.url);
    url.searchParams.set("callbackUrl", encodeURI("/file-analysis"));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sample-records/:path*", "/collect-files/:path*"],
};

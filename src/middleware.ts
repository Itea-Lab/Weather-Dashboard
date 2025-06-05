import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedPaths = ["/api/mockData/", "/api/weather/"];
  // console.log("Middleware triggered for path:", path);
  // Skip middleware for non-API routes or the auth API itself
  if (!path.startsWith("/api/") || path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check for browser direct access vs app requests
  const referer = request.headers.get("referer") || "";
  const isDirectAccess = !referer.includes(request.nextUrl.origin);

  // check if this is direct access
  if (isDirectAccess && protectedPaths.some((p) => path.startsWith(p))) {
    // console.log("Blocking direct API access");
    return NextResponse.json(
      { error: "Direct API access not allowed" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};

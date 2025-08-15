import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedPaths = ["/api/mockData/", "/api/weather/"];
  console.log("Middleware triggered for path:", path);
  // Skip middleware for non-API routes or the auth API itself
  if (!path.startsWith("/api/") || path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check for browser direct access vs app requests
  const referer = request.headers.get("referer") || "";
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol =
    request.headers.get("x-forwarded-proto") || request.nextUrl.protocol;
  const expectedOrigin = `${protocol}://${host}`;
  const isDirectAccess = !referer.includes(expectedOrigin);

  // Debug logs
  console.log("Referer:", referer);
  console.log("Host:", host);
  console.log("Protocol:", protocol);
  console.log("Expected Origin:", expectedOrigin);
  console.log("NextUrl Origin:", request.nextUrl.origin);
  console.log("Is Direct Access:", isDirectAccess);

  // check if this is direct access
  if (isDirectAccess && protectedPaths.some((p) => path.startsWith(p))) {
    console.log("Blocking direct API access for path:", path);
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

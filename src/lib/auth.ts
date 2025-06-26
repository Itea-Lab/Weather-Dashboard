import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_CONFIG, hashCSRFToken, verifyJWT } from "./authUtils";

export async function withAuth(req: Request, handler: Function) {
  try {
    console.log("----- AUTH CHECK -----");

    // 1. Get CSRF token from header
    const csrfToken = req.headers.get(AUTH_CONFIG.CSRF_HEADER);
    const cookieStore = await cookies();
    const csrfHash = cookieStore.get(AUTH_CONFIG.CSRF_KEY)?.value;

    if (!csrfToken) {
      console.log("Missing CSRF token");
      return NextResponse.json(
        { error: "CSRF token required" },
        { status: 403 }
      );
    }

    // 2. Get auth token
    let token = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    if (!token) {
      try {
        token = cookieStore.get(AUTH_CONFIG.TOKEN_KEY)?.value;
      } catch (_error) {
        // Ignore cookie errors
      }
    }

    if (!token) {
      console.log("No auth token found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 3. Verify CSRF
    if (!csrfHash) {
      console.log("Missing CSRF hash cookie");
      return NextResponse.json({ error: "Invalid session" }, { status: 403 });
    }

    const calculatedHash = hashCSRFToken(csrfToken);
    if (calculatedHash !== csrfHash) {
      console.log("CSRF token mismatch");
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      );
    }

    // 4. Verify JWT
    try {
      const decoded = verifyJWT(token);
      console.log("API route: JWT token verified successfully", decoded);
      return handler(req, { user: decoded });
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function withAuth(req: Request, handler: Function) {
  try {
    console.log("----- AUTH CHECK -----");
    // 1. Get CSRF token from header
    const csrfToken = req.headers.get("x-csrf-token");
    const cookieStore = await cookies();
    const csrfHash = cookieStore.get("csrf-token")?.value;

    if (!csrfToken) {
      console.log("Missing CSRF token");
      return NextResponse.json(
        { error: "CSRF token required" },
        { status: 403 }
      );
    }
    // 2. Get auth token (try header first, then fall back to cookie)
    let token = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // If no token in header, check cookies
    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get("auth-token")?.value;
      } catch (e) {
        // Ignore cookie errors
      }
    }

    // If no token found at all, user is not authenticated
    if (!token) {
      console.log("No auth token found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 3. Get expected CSRF hash from cookie 
    console.log("Auth Check - CSRF Debug:", {
      headerToken: csrfToken?.substr(0, 8) + "...", // Show part of the token for privacy
      cookieExists: !!csrfHash,
      allCookies: cookieStore.getAll().map((c) => c.name),
    });
    
    if (!csrfHash) {
      console.log("Missing CSRF hash cookie");
      return NextResponse.json({ error: "Invalid session" }, { status: 403 });
    }

    // 4. Verify CSRF token matches hash
    const calculatedHash = crypto
      .createHash("sha256")
      .update(csrfToken)
      .digest("hex");

    if (calculatedHash !== csrfHash) {
      console.log("CSRF token mismatch");
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      );
    }

    try {
      // 5. Verify JWT token
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT secret is not defined in environment variables");
      }
      const decoded = jwt.verify(token, jwtSecret);
      console.log("API route: JWT token verified successfully", decoded);

      // You can pass the decoded user information to your handler
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

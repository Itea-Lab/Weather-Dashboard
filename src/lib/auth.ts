import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function withAuth(req: Request, handler: Function) {
  try {
    // Get the auth token from header
    const authHeader = req.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get("auth-token")?.value || null;
      } catch (e) {
        // Ignore cookie errors
      }
    }
    if (!token) {
      console.log("API route: No auth token found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      // Verify the JWT token
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

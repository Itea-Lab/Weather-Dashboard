import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { DecodedToken } from "@/types/token";

// simulate a user database
const users = [
  {
    id: "1",
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    roles: process.env.ADMIN_ROLE,
  },
  {
    id: "2",
    username: process.env.TEST_USERNAME,
    passwordHash: process.env.TEST_PASSWORD_HASH,
    name: process.env.TEST_NAME,
    email: process.env.TEST_EMAIL,
    roles: process.env.TEST_ROLE,
  }
];

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Find user by username
    const user = users.find((u) => u.username === username);
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate CSRF token
    const csrfToken = crypto.randomUUID();

    // Create hash of the CSRF token
    const csrfHash = crypto
      .createHash("sha256")
      .update(csrfToken)
      .digest("hex");

    // Generate JWT
    const signOptions: SignOptions = {
      expiresIn: "1d",
    };

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      process.env.JWT_SECRET!,
      signOptions
    );

    // Create response with user data
    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      token,
      csrfToken,
    });

    // Set HTTP-only cookie for additional security
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 days
    });
    response.cookies.set("csrf-token", csrfHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (_error) {
    // console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Verify token endpoint
export async function GET(request: NextRequest) {
  try {
    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") ||
      request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    return NextResponse.json({
      user: {
        id: decoded.userId,
        username: decoded.username,
        name: decoded.name,
        email: decoded.email,
        roles: decoded.roles,
      },
    });
  } catch (_error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
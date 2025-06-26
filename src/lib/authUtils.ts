import jwt from "jsonwebtoken";
import crypto from "crypto";

export const AUTH_CONFIG = {
  TOKEN_KEY: "auth-token",
  CSRF_KEY: "csrf-token",
  CSRF_HEADER: "x-csrf-token",
} as const;

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashCSRFToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyJWT(token: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.verify(token, jwtSecret);
}

export function signJWT(payload: any) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
}

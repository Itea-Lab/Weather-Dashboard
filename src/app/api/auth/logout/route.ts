import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the auth cookie completely
  response.cookies.delete("auth-token");
  response.cookies.delete("csrf-token");

  return response;
}

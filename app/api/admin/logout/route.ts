// /app/api/admin/logout/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = new NextResponse("Logged out successfully");
    response.cookies.set("auth", "", {
      path: "/",
      expires: new Date(0)
    });

    return response;
  } catch (error) {
    console.error("[LOGOUT_GET] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

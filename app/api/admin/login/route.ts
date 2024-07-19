import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Read environment variables
const adminPassword = process.env.ADMIN_PASSWORD;
const secretKey = process.env.JWT_SECRET || "123";

export async function POST(req: Request) {
 try {
  const { password } = await req.json();

  if (password === adminPassword) {
   const token = jwt.sign({ role: "admin" }, secretKey, {
    expiresIn: "1h"
   });
   const response = new NextResponse("Login successful", {
    status: 200
   });
   response.cookies.set("auth", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
   });
   console.log("Setting auth cookie");
   return response;
  } else {
   return new NextResponse("Invalid password", { status: 400 });
  }
 } catch (error) {
  console.error("[LOGIN_POST] Error:", error);
  return new NextResponse("Internal Error", { status: 500 });
 }
}

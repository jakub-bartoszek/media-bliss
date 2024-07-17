
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const dataPath = process.env.DATA_PATH || "";
const adminFilePath = path.join(process.cwd(), dataPath, "admin.json");
const secretKey = process.env.JWT_SECRET || "123";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (fs.existsSync(adminFilePath)) {
      const adminCredentials = JSON.parse(fs.readFileSync(adminFilePath, "utf-8"));

      if (password === adminCredentials.password) {
        const token = jwt.sign({ role: "admin" }, secretKey, {
          expiresIn: "1h",
        });
        const response = new NextResponse("Login successful", {
          status: 200,
        });
        response.cookies.set("auth", token, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        console.log("Setting auth cookie");
        return response;
      } else {
        return new NextResponse("Invalid password", { status: 400 });
      }
    } else {
      console.error("[LOGIN_POST] Error: admin.json file not found");
      return new NextResponse("Internal Error", { status: 500 });
    }
  } catch (error) {
    console.error("[LOGIN_POST] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

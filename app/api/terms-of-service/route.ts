import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const TERMS_OF_SERVICE_PATH = path.join(
 process.cwd(),
 "public",
 "/terms-of-service.md"
);

export async function GET() {
 try {
  const termsOfService = await fs.readFile(
   TERMS_OF_SERVICE_PATH,
   "utf-8"
  );
  return new NextResponse(termsOfService, { status: 200 });
 } catch (error) {
  console.error("Error reading terms of service:", error);
  return new NextResponse("Failed to read terms of service.", {
   status: 500
  });
 }
}

export async function PATCH(req: NextRequest) {
 try {
  const body = await req.json();
  const { termsOfService } = body;
  await fs.writeFile(TERMS_OF_SERVICE_PATH, termsOfService, "utf-8");
  return new NextResponse("Terms of service updated successfully.", {
   status: 200
  });
 } catch (error) {
  console.error("Error updating terms of service:", error);
  return new NextResponse("Failed to update terms of service.", {
   status: 500
  });
 }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GET(req: any, res: any) {
 if (req.method === "GET") {
  try {
   const services = await prisma.service.findMany({
    orderBy: {
     id: "asc"
    }
   });
   res.status(200).json(services);
  } catch (error) {
   res.status(500).json({ error: "Failed to fetch services" });
  }
 } else {
  res.status(405).json({ error: "Method not allowed" });
 }
}

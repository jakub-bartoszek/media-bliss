import { PrismaClient, ServiceCategory } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchServices = async ({
 category
}: {
 category?: ServiceCategory;
}) => {
 const services = await prisma.service.findMany({
  where: category ? { category } : {},
  orderBy: {
   price: "desc"
  }
 });
 return services;
};

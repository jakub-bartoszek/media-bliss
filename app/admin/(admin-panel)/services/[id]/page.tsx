// app/admin/services/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import ServiceForm from "@/components/admin/admin-service-form";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

interface ServiceIdPageProps {
 params: {
  id: string;
 };
}

const ServiceIdPage = async ({ params }: ServiceIdPageProps) => {
 const service = await prisma.service.findUnique({
  where: {
   id: parseInt(params.id)
  }
 });

 if (!service) {
  redirect(`/admin/home`);
 }

 return <ServiceForm service={service} />;
};

export default ServiceIdPage;

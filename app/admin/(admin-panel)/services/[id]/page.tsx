import ServiceForm from "@/components/admin/admin-service-form";
import { prisma } from "@/lib/server/database/prisma";
import { redirect } from "next/navigation";
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
 const serviceWithNumberPrice = {
  ...service,
  price: service.price.toNumber()
 };

 return <ServiceForm service={serviceWithNumberPrice} />;
};

export default ServiceIdPage;

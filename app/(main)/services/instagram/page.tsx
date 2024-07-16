import { Service } from "@prisma/client";
import { fetchServices } from "@/lib/fetchServices";
import Services from "@/components/services";

const InstagramServicesPage = async () => {
 const services: Service[] = await fetchServices({
  category: "Instagram"
 });

 return <Services category={"Instagram"} services={services} />;
};

export default InstagramServicesPage;

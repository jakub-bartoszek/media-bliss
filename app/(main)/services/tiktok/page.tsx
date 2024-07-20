import { Service } from "@prisma/client";
import { fetchServices } from "@/lib/fetchServices";
import Services from "@/components/services";
import { ServiceWithDecimalPrice } from "@/types";

const TikTokServicesPage = async () => {
 const services: ServiceWithDecimalPrice[] = await fetchServices({
  category: "TikTok"
 });

 return (
  <Services
   category="TikTok"
   services={services}
  />
 );
};

export default TikTokServicesPage;

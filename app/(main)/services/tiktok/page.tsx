import { Service } from "@prisma/client";
import { fetchServices } from "@/lib/fetchServices";
import Services from "@/components/services";

const TikTokServicesPage = async () => {
 const services: Service[] = await fetchServices({
  category: "TikTok"
 });

 return <Services category="TikTok" services={services} />;
};

export default TikTokServicesPage;

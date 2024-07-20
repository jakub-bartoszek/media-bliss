import { fetchServices } from "@/lib/fetchServices";
import Services from "@/components/services";
import { ServiceWithDecimalPrice } from "@/types";

const InstagramServicesPage = async () => {
 const services: ServiceWithDecimalPrice[] = await fetchServices({
  category: "Instagram"
 });

 return <Services category={"Instagram"} services={services} />;
};

export default InstagramServicesPage;

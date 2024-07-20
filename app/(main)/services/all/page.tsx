import { fetchServices } from "@/lib/fetchServices";
import Services from "@/components/services";
import { ServiceWithDecimalPrice } from "@/types";

const AllServicesPage = async () => {
 const services: ServiceWithDecimalPrice[] = await fetchServices({});

 const instagramServices = services.filter(
  (service) => service.category === "Instagram"
 );
 const tiktokServices = services.filter(
  (service) => service.category === "TikTok"
 );

 return (
  <>
   <Services
    category={"Instagram"}
    services={instagramServices}
   />
   <Services
    category={"TikTok"}
    services={tiktokServices}
   />
  </>
 );
};

export default AllServicesPage;

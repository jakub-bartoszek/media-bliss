"use client";

import Error from "@/components/error";
import Loader from "@/components/loader";
import Services from "@/components/services/services";
import useServices from "@/lib/hooks/useServices";

const TikTokServicesPage = () => {
 const { services, loading, error } = useServices();

 const tiktokServices = services.filter(
  (service) => service.category === "TikTok"
 );

 if (loading) return <Loader />;

 if (error) return <Error />;

 return (
  <Services
   category={"TikTok"}
   services={tiktokServices}
  />
 );
};

export default TikTokServicesPage;

"use client";

import Error from "@/components/error";
import Loader from "@/components/loader";
import Services from "@/components/client/services/services";
import useServices from "@/lib/hooks/useServices";

const InstagramServicesPage = () => {
 const { services, loading, error } = useServices();

 const instagramServices = services.filter(
  (service) => service.category === "Instagram"
 );

 if (loading) return <Loader />;

 if (error) return <Error />;

 return (
  <Services
   category={"Instagram"}
   services={instagramServices}
  />
 );
};

export default InstagramServicesPage;

"use client";

import Error from "@/components/client/error";
import Loader from "@/components/client/loader";
import Services from "@/components/client/services/services";
import useServices from "@/lib/hooks/useServices";

const AllServicesPage = () => {
 const { services, loading, error } = useServices();

 const instagramServices = services.filter(
  (service) => service.category === "Instagram"
 );
 const tiktokServices = services.filter(
  (service) => service.category === "TikTok"
 );

 if (loading) return <Loader />;

 if (error) return <Error />;

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

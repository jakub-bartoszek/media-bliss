"use client";

import Services from "@/components/services";
import { ServiceWithDecimalPrice } from "@/types";
import { useEffect, useState } from "react";

const AllServicesPage = () => {
 const [services, setServices] = useState<ServiceWithDecimalPrice[]>(
  []
 );

 const fetchServices = async () => {
  try {
   const response = await fetch("/api/admin/services");
   const data = await response.json();
   setServices(data);
  } catch (error) {
   console.error("Failed to fetch services", error);
  }
 };

 useEffect(() => {
  fetchServices();
 }, []);

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

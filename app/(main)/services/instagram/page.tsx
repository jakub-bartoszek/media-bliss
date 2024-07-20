"use client";

import Services from "@/components/services";
import { ServiceWithDecimalPrice } from "@/types";
import { useEffect, useState } from "react";

const InstagramServicesPage = () => {
 const [services, setServices] = useState<ServiceWithDecimalPrice[]>(
  []
 );

 const fetchServices = async () => {
  try {
   const response = await fetch("/api/services");
   const data = await response.json();
   setServices(data);
  } catch (error) {
   console.error("Failed to fetch services", error);
  }
 };

 useEffect(() => {
  fetchServices();
 }, []);

 return (
  <Services
   category={"Instagram"}
   services={services}
  />
 );
};

export default InstagramServicesPage;

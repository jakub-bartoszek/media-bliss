"use client";

import { useState, useEffect } from "react";
import { ServiceWithDecimalPrice } from "@/types";

const useServices = () => {
 const [services, setServices] = useState<ServiceWithDecimalPrice[]>(
  []
 );
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchServices = async () => {
  try {
   setLoading(true);
   const response = await fetch("/api/services");
   const data = await response.json();
   setServices(data);
  } catch (error) {
   setError("Failed to fetch services");
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchServices();
 }, []);

 return { services, error, loading };
};

export default useServices;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
   const response = await axios.get("/api/services");
   setServices(response.data);
  } catch (error) {
   setError("Failed to fetch services");
   console.error("Error fetching services:", error);
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

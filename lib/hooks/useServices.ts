"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Service } from "@prisma/client";

const useServices = (category?: string) => {
 const [services, setServices] = useState<Service[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const fetchServices = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/services", {
    params: { category }
   });
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

 return { services, error, loading, refetch: fetchServices };
};

export default useServices;

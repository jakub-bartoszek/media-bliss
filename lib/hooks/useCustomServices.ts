"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CustomService } from "@prisma/client";

const useCustomServices = (category?: string) => {
 const [customServices, setCustomServices] = useState<CustomService[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const fetchCustomServices = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/custom-services", {
    params: { category }
   });
   setCustomServices(response.data);
  } catch (error) {
   setError("Failed to fetch custom services");
   console.error("Error fetching custom services:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchCustomServices();
 }, []);

 return { customServices, error, loading, refetch: fetchCustomServices };
};

export default useCustomServices;

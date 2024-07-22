"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ServiceWithDecimalPrice } from "@/types";

const useService = (serviceId?: number) => {
 const [service, setService] =
  useState<ServiceWithDecimalPrice | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchService = async () => {
  try {
   setLoading(true);

   const response = await axios.get(`/api/services/${serviceId}`);
   setService(response.data);
  } catch (error) {
   setError("Failed to fetch service");
   console.error("Error fetching service:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchService();
 }, [serviceId]);

 return { service, error, loading };
};

export default useService;

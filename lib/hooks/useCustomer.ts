"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Customer } from "@prisma/client";

const useCustomer = (customerId?: number) => {
 const [customer, setCustomer] = useState<Customer | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchCustomer = async () => {
  try {
   setLoading(true);

   const response = await axios.get(`/api/customers/${customerId}`);
   setCustomer(response.data);
  } catch (error) {
   setError("Failed to fetch customer");
   console.error("Error fetching customer:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchCustomer();
 }, [customerId]);

 return { customer, error, loading };
};

export default useCustomer;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Customer } from "@prisma/client";

const useCustomers = () => {
 const [customers, setCustomers] = useState<Customer[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchCustomers = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/customers");
   setCustomers(response.data);
  } catch (error) {
   setError("Failed to fetch customers");
   console.error("Error fetching customers:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchCustomers();
 }, []);

 return { customers, error, loading };
};

export default useCustomers;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Category, CustomAccount } from "@prisma/client";

const useCustomAccounts = (category?: Category) => {
 const [customAccounts, setCustomAccounts] = useState<CustomAccount[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const fetchCustomAccounts = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/custom-accounts", {
    params: { category }
   });
   setCustomAccounts(response.data);
  } catch (error) {
   setError("Failed to fetch custom accounts");
   console.error("Error fetching custom accounts:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchCustomAccounts();
 }, [category]);

 return { customAccounts, error, loading, refetch: fetchCustomAccounts };
};

export default useCustomAccounts;

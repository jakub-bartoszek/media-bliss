"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AccountForSale } from "@prisma/client";

const useAccounts = (category?: string) => {
 const [accounts, setAccounts] = useState<AccountForSale[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const fetchAccounts = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/accounts", {
    params: { category }
   });
   setAccounts(response.data);
  } catch (error) {
   setError("Failed to fetch accounts");
   console.error("Error fetching accounts:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchAccounts();
 }, []);

 return { accounts, error, loading, refetch: fetchAccounts };
};

export default useAccounts;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AccountWithDecimalPrice } from "@/types";

const useAccounts = () => {
 const [accounts, setAccounts] = useState<AccountWithDecimalPrice[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchAccounts = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/accounts");
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

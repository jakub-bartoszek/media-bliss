"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AccountForSale } from "@prisma/client";

const useAccount = (accountId?: number) => {
 const [account, setAccount] = useState<AccountForSale | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchService = async () => {
  try {
   setLoading(true);

   const response = await axios.get(`/api/accounts/${accountId}`);
   setAccount(response.data);
  } catch (error) {
   setError("Failed to fetch account");
   console.error("Error fetching account:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchService();
 }, [accountId]);

 return { account, error, loading };
};

export default useAccount;

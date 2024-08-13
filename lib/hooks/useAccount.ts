"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AccountWithDecimalPrice } from "@/types";

const useAccount = (accountId?: number) => {
 const [account, setAccount] = useState<AccountWithDecimalPrice | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchAccount = async () => {
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
  fetchAccount();
 }, [accountId]);

 return { account, error, loading };
};

export default useAccount;

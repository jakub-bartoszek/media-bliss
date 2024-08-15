"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Package } from "@prisma/client";

const usePackage = (packageId?: number) => {
 const [pkg, setPackage] = useState<Package | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchPackage = async () => {
  try {
   setLoading(true);

   const response = await axios.get(`/api/packages/${packageId}`);
   setPackage(response.data);
  } catch (error) {
   setError("Failed to fetch package");
   console.error("Error fetching package:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchPackage();
 }, [packageId]);

 return { pkg, error, loading };
};

export default usePackage;

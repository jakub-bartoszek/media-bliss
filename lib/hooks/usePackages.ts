"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Package } from "@prisma/client";

const usePackages = (category?: string) => {
 const [packages, setPackages] = useState<Package[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const fetchPackages = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/packages", {
    params: { category }
   });
   setPackages(response.data);
  } catch (error) {
   setError("Failed to fetch packages");
   console.error("Error fetching packages:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchPackages();
 }, [category]);

 return { packages, error, loading, refetch: fetchPackages };
};

export default usePackages;

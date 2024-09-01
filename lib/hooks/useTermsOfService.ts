import axios from "axios";
import { useState, useEffect } from "react";

const useTermsOfService = () => {
 const [termsOfService, setTermsOfService] = useState<string>("");
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchTermsOfService = async () => {
   try {
    const response = await axios.get("/api/terms-of-service");
    setTermsOfService(response.data);
   } catch (err: any) {
    setError(err.message || "Failed to fetch terms of service");
   } finally {
    setLoading(false);
   }
  };

  fetchTermsOfService();
 }, []);

 const updateTermsOfService = async (newTerms: string) => {
  setLoading(true);
  try {
   await axios.patch("/api/terms-of-service", { termsOfService: newTerms });
   setTermsOfService(newTerms);
  } catch (err: any) {
   setError(err.message || "Failed to update terms of service");
  } finally {
   setLoading(false);
  }
 };

 return { termsOfService, loading, error, updateTermsOfService };
};

export default useTermsOfService;

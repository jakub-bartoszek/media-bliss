import { useState, useEffect } from "react";

const useTermsOfService = () => {
 const [termsOfService, setTermsOfService] = useState<string>("");
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchTermsOfService = async () => {
   try {
    const response = await fetch("/api/terms-of-service");
    if (!response.ok)
     throw new Error("Failed to fetch terms of service");
    const data = await response.text();
    setTermsOfService(data);
   } catch (err: any) {
    setError(err.message);
   } finally {
    setLoading(false);
   }
  };

  fetchTermsOfService();
 }, []);

 const updateTermsOfService = async (newTerms: string) => {
  setLoading(true);
  try {
   const response = await fetch("/api/terms-of-service", {
    method: "PATCH",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({ termsOfService: newTerms })
   });
   if (!response.ok)
    throw new Error("Failed to update terms of service");
   setTermsOfService(newTerms);
  } catch (err: any) {
   setError(err.message);
  } finally {
   setLoading(false);
  }
 };

 return { termsOfService, loading, error, updateTermsOfService };
};

export default useTermsOfService;

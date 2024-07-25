"use client";

import Error from "@/components/client/error";
import Loader from "@/components/client/loader";
import useTermsOfService from "@/lib/hooks/useTermsOfService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TermsOfServicePage() {
 const { termsOfService, loading, error } = useTermsOfService();

 if (loading) return <Loader />;
 if (error) return <Error />;

 return (
  <div className="w-full pt-24">
   <div className="prose p-4">
    <h1>Terms of Service</h1>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
     {termsOfService}
    </ReactMarkdown>
   </div>
  </div>
 );
}

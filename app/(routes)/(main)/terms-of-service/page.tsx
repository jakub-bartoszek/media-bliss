"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useTermsOfService from "@/lib/hooks/useTermsOfService";
import Error from "@/components/error";
import Loader from "@/components/loader";

export default function TermsOfServicePage() {
 const { termsOfService, loading, error } = useTermsOfService();

 if (loading) return <Loader />;
 if (error) return <Error />;

 return (
  <div className="w-full pt-20">
   <div className="prose p-4">
    <h1>Terms of Service</h1>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
     {termsOfService}
    </ReactMarkdown>
   </div>
  </div>
 );
}

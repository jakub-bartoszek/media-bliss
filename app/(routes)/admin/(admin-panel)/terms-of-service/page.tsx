"use client";

import { useState, useEffect, useRef } from "react";
import useTermsOfService from "@/lib/hooks/useTermsOfService";
import Loader from "@/components/client/loader";
import Error from "@/components/client/error";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TermsOfService = () => {
 const router = useRouter();
 const { termsOfService, loading, error, updateTermsOfService } =
  useTermsOfService();
 const [isEditing, setIsEditing] = useState(false);
 const [editedTerms, setEditedTerms] = useState("");
 const textareaRef = useRef<HTMLTextAreaElement>(null);

 useEffect(() => {
  if (termsOfService) {
   setEditedTerms(termsOfService);
  }
 }, [termsOfService]);

 useEffect(() => {
  if (textareaRef.current && isEditing) {
   textareaRef.current.style.height = "auto";
   textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
 }, [isEditing, editedTerms]);

 if (loading) return <Loader />;
 if (error) return <Error />;

 const handleSave = () => {
  updateTermsOfService(editedTerms);
  setIsEditing(false);
 };

 const handleTextareaChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>
 ) => {
  setEditedTerms(e.target.value);
  if (textareaRef.current) {
   textareaRef.current.style.height = "auto";
   textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
 };

 return (
  <div className="w-full h-full min-h-screen flex flex-col relative">
   <div className="sticky top-0 z-10 w-full h-14 flex items-center justify-between gap-4 border-b-2 border-white/20 p-4 bg-zinc-900">
    <button
     className="text-white py-2 px-4 rounded-full bg-zinc-700 hover:bg-zinc-500 font-bold"
     onClick={() => router.back()}
    >
     Powrót
    </button>
    <div className="flex gap-4 items-center">
     <button
      className="text-white py-2 px-4 rounded-full bg-rose-700 hover:bg-rose-600 font-bold"
      onClick={() => setIsEditing(!isEditing)}
     >
      Edytuj
     </button>
     <button
      className="text-white py-2 px-4 rounded-full bg-indigo-700 hover:bg-indigo-600 font-bold"
      onClick={handleSave}
     >
      Zapisz
     </button>
    </div>
   </div>
   <div className="flex-1 p-4 overflow-y-auto">
    {isEditing ? (
     <textarea
      ref={textareaRef}
      className="w-full h-auto bg-zinc-900 overflow-hidden"
      value={editedTerms}
      onChange={handleTextareaChange}
     />
    ) : (
     <div className="prose text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
       {termsOfService}
      </ReactMarkdown>
     </div>
    )}
   </div>
  </div>
 );
};

export default TermsOfService;

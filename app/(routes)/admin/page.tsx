"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";

const AdminRedirect = () => {
 const router = useRouter();

 useEffect(() => {
  router.push("/admin/login");
 }, []);

 return (
  <div className="text-white flex flex-col items-center justify-center h-screen gap-2">
   <LuLoader2 className="animate-spin h-20 w-20 text-primary" />
   <span className="text-xl">Redirecting to login page...</span>
  </div>
 );
};

export default AdminRedirect;

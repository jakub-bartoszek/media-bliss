"use client"

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminRedirect = () => {
 const router = useRouter();

 useEffect(() => {
  router.push("/admin/login");
 }, []);

 return (
  <div className="bg-surface-200 min-h-screen flex items-center justify-center">
   Redirecting to login page...
  </div>
 );
};

export default AdminRedirect;

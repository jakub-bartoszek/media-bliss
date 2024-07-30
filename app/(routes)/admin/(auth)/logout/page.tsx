"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";

const LogoutPage = () => {
 const router = useRouter();

 useEffect(() => {
  const logout = async () => {
   try {
    const response = await axios.get("/api/admin/logout");

    if (response.status === 200) {
     router.push("/admin/login");
    } else {
     toast.error("Failed to log out");
    }
   } catch (error) {
    toast.error(`Logout error: ${error}`);
   }
  };

  logout();
 }, [router]);

 return (
  <div className="text-white flex flex-col items-center justify-center h-screen gap-2">
   <LuLoader2 className="animate-spin h-20 w-20 text-primary" />
   <span className="text-xl">Logging out...</span>
  </div>
 );
};

export default LogoutPage;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";

const LogoutPage = () => {
 const router = useRouter();

 useEffect(() => {
  const logout = async () => {
   try {
    const response = await fetch("/api/admin/logout", {
     method: "GET"
    });

    if (response.ok) {
     router.push("/admin/login");
    } else {
     console.error("Failed to log out");
    }
   } catch (error) {
    console.error("Logout error:", error);
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

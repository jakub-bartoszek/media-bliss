"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/components/button";

const LoginPage = () => {
 const [error, setError] = useState(false);
 const [awaiting, setAwaiting] = useState(false);

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setAwaiting(true);

  const formData = new FormData(e.target);
  const password = formData.get("password");

  try {
   const res = await axios.post("/api/admin/login", { password });

   setAwaiting(false);

   if (res.status === 200) {
    setError(false);
    window.location.href = "/admin/home";
   } else {
    setError(true);
   }
  } catch (error) {
   toast.error(`Error: ${error}`);
   setAwaiting(false);
   setError(true);
  }
 };

 return (
  <form
   onSubmit={handleSubmit}
   className="w-1/2 ml-auto mr-auto h-screen flex flex-col items-center justify-center gap-y-6"
  >
   <h1 className="text-primary text-5xl">Admin</h1>
   <div className="w-full flex gap-y-2 flex-col">
    <input
     name="password"
     type="password"
     placeholder="Hasło"
     className="w-full px-4 py-2.5 outline-none bg-surface-100 border-2 border-primary rounded-xl"
    />
    <Button
     className="w-full"
     disabled={awaiting}
    >
     Login
    </Button>
    {error && <small className="text-rose-500">Hasło jest nieprawidłowe</small>}
   </div>
  </form>
 );
};

export default LoginPage;

"use client";

import { useState } from "react";

const AdminForm = () => {
 const [error, setError] = useState(false);
 const [awaiting, setAwaiting] = useState(false);

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setAwaiting(true);

  const formData = new FormData(e.target);
  const password = formData.get("password");

  try {
   const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
   });

   setAwaiting(false);

   if (res.status === 200) {
    setError(false);
    window.location.href = "/admin/home";
   } else {
    setError(true);
   }
  } catch (error) {
   console.error("Error:", error);
   setError(true);
  }
 };

 return (
  <form
   onSubmit={handleSubmit}
   className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-24 w-[80%] max-w-[400px] flex flex-col items-center justify-center gap-4"
  >
   <h1 className="text-indigo-600 text-5xl mb-6">Admin</h1>
   <input
    name="password"
    type="password"
    placeholder="Hasło"
    className="w-full px-4 py-2.5 outline-none bg-surface-100 border-2 border-indigo-600 rounded-xl caret-white text-white"
   />
   <button
    className="w-full py-2.5 text-white bg-indigo-600 rounded-xl disabled:opacity-50 transition-opacity"
    disabled={awaiting}
   >
    Login
   </button>
   {error && (
    <small className="text-rose-500">Hasło jest nieprawidłowe</small>
   )}
  </form>
 );
};

export default AdminForm;

"use client";

import Button from "@/components/button";
import { useEffect } from "react";

const Success = () => {
 useEffect(() => {
  localStorage.removeItem("cart");
 }, []);

 return (
  <div className="w-full h-screen flex flex-col items-center justify-center text-zinc-800 p-4">
   <div className="max-w-lg w-full p-6 text-center">
    <svg
     className="w-16 h-16 mx-auto text-primary"
     fill="none"
     stroke="currentColor"
     viewBox="0 0 24 24"
     xmlns="http://www.w3.org/2000/svg"
    >
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2l4 -4m6 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z"
     ></path>
    </svg>
    <h1 className="text-3xl font-bold mt-4">Płatność zakończona sukcesem</h1>
    <p className="text-lg mt-2 text-zinc-600">
     Dziękujemy za zakup! Twoje zamówienie jest przetwarzane.
    </p>
    <a href="/services/all">
     <Button className="mt-4">Kontynuuj zakupy</Button>
    </a>
   </div>
  </div>
 );
};

export default Success;

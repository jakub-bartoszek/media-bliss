"use client";

import { useEffect } from "react";
import Button from "@/components/button";
import { trackPixelEvent } from "@/lib/utils/facebookPixel";

const Success = () => {
 useEffect(() => {
  localStorage.removeItem("cart");

  const params = new URLSearchParams(window.location.search);
  const purchaseValue = params.get("value") || "0.00";

  trackPixelEvent("Purchase", {
   value: parseFloat(purchaseValue),
   currency: "PLN"
  });
 }, []);

 return (
  <div className="w-full h-screen flex flex-col items-center justify-center p-4">
   <div className="max-w-lg w-full p-6 text-center">
    <svg
     className="w-16 h-16 mx-auto rounded-full text-accent"
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
    <p className="text-lg mt-2 text-muted">
     Dziękujemy za zakup! Twoje zamówienie jest przetwarzane.
    </p>
    <a href="/services/all">
     <Button className="mt-4 bg-fade">Kontynuuj zakupy</Button>
    </a>
   </div>
  </div>
 );
};

export default Success;

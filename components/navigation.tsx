"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaShoppingBag } from "react-icons/fa";

interface NavigationProps {
 setShowed: Dispatch<SetStateAction<boolean>>;
 showed: boolean;
}

const Navigation = ({ setShowed, showed }: NavigationProps) => {
 const [cartCount, setCartCount] = useState(0);
 const dropdownRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target as Node)
   ) {
    setShowed(false);
   }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [setShowed]);

 useEffect(() => {
  const updateCartCount = () => {
   const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
   setCartCount(cartItems.length);
  };

  updateCartCount();

  window.addEventListener("storage", updateCartCount);

  return () => {
   window.removeEventListener("storage", updateCartCount);
  };
 }, []);

 return (
  <nav className="ml-auto mr-auto max-w-[1400px] w-full h-full z-30 relative">
   <div className="w-full h-full p-4 flex justify-between items-center">
    <a
     href="/"
     className="h-full"
    >
     <img
      className="w-full h-full"
      src="/logos/mb-logo-dark-fade-3.svg"
      alt="Logo"
     />
    </a>
    <div className="flex items-center gap-4 md:gap-8">
     <div
      className="relative flex flex-col items-center justify-center"
      ref={dropdownRef}
     >
      <button
       className="px-4 py-2"
       onClick={() => setShowed(!showed)}
      >
       Usługi
      </button>
      <div
       className={twMerge(
        "absolute p-2 top-[calc(100%+8px)] flex flex-col gap-2 rounded-[0_0_8px_8px] opacity-0 transition duration-500 origin-top scale-y-0 z-[-1] bg-[#250f4a]",
        showed && "opacity-100 scale-y-100"
       )}
      >
       <a
        href="/services/all"
        className="px-4 py-2 rounded-lg hover:bg-[#3d1a79] transition-colors"
       >
        Wszystkie
       </a>
       <a
        href="/services/instagram"
        className="px-4 py-2 rounded-lg hover:bg-[#3d1a79] transition-colors"
       >
        Instagram
       </a>
       <a
        href="/services/tiktok"
        className="px-4 py-2 rounded-lg hover:bg-[#3d1a79] transition-colors"
       >
        TikTok
       </a>
       <a
        href="/services/other"
        className="px-4 py-2 rounded-lg hover:bg-[#3d1a79] transition-colors"
       >
        Pozostałe
       </a>
      </div>
     </div>
     <a
      href="/cart"
      className="relative"
     >
      <FaShoppingBag className="h-6 w-6" />
      {cartCount > 0 && (
       <span className="absolute top-[-4px] right-[-4px] bg-rose-500 text-white text-xs rounded-full px-1">
        {cartCount}
       </span>
      )}
     </a>
    </div>
   </div>
  </nav>
 );
};

export default Navigation;

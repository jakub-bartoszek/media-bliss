"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ModeToggle } from "./mode-toggle";
import { Sidebar } from "./sidebar";
import { FaShoppingBag } from "react-icons/fa";
import { MenuIcon } from "lucide-react";

interface NavigationProps {
 setShowed: Dispatch<SetStateAction<boolean>>;
 showed: boolean;
}

const Navigation = ({ setShowed, showed }: NavigationProps) => {
 const [cartCount, setCartCount] = useState(0);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const toggleSidebar = () => {
  setIsSidebarOpen(() => !isSidebarOpen);
 };

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
  <nav className="relative z-30 ml-auto mr-auto h-full w-full max-w-[1400px]">
   <div className="flex h-full w-full items-center justify-between p-4">
    <div className="flex h-6 items-center justify-center gap-4">
     <button
      className="sm:hidden"
      onClick={toggleSidebar}
     >
      <MenuIcon className="h-8 w-8" />
     </button>
     <a
      href="/"
      className="h-full"
     >
      <img
       className="hidden h-full w-full dark:block"
       src="/logos/mb-logo-dark-fade-3.svg"
       alt="Logo"
      />
      <img
       className="h-full w-full dark:hidden"
       src="/logos/mb-logo-light-fade-3.svg"
       alt="Logo"
      />
     </a>
    </div>
    <div className="hidden items-center gap-4 sm:flex">
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
        "absolute top-[calc(100%+8px)] z-[-1] flex origin-top scale-y-0 flex-col gap-2 rounded-[0_0_8px_8px] bg-bg-nav p-2 opacity-0 shadow-xl transition duration-500",
        showed && "opacity-100 scale-y-100"
       )}
      >
       <a
        href="/services/all"
        className="rounded-lg px-4 py-2 transition-colors hover:bg-black/15"
       >
        Wszystkie
       </a>
       <a
        href="/services/instagram"
        className="rounded-lg px-4 py-2 transition-colors hover:bg-black/15"
       >
        Instagram
       </a>
       <a
        href="/services/tiktok"
        className="rounded-lg px-4 py-2 transition-colors hover:bg-black/15"
       >
        TikTok
       </a>
       <a
        href="/services/other"
        className="rounded-lg px-4 py-2 transition-colors hover:bg-black/15"
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
       <span className="absolute right-[-4px] top-[-4px] rounded-full bg-rose-500 px-1 text-xs text-white">
        {cartCount}
       </span>
      )}
     </a>
     <ModeToggle />
    </div>
   </div>
   <Sidebar
    isSidebarOpen={isSidebarOpen}
    toggleSidebar={toggleSidebar}
   />
  </nav>
 );
};

export default Navigation;

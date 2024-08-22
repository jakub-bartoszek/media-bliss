"use client";

import { useEffect, useState } from "react";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
 isSidebarOpen: boolean;
 toggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
 const { theme, setTheme } = useTheme();
 const [mounted, setMounted] = useState(false);

 // Ensures the component is only mounted on the client
 useEffect(() => {
  setMounted(true);
 }, []);

 // Avoid rendering until mounted to prevent hydration errors
 if (!mounted) {
  return null;
 }

 return (
  <div>
   <div
    className={twMerge(
     "fixed sm:hidden left-0 top-0 w-screen h-screen bg-black/80 backdrop-blur-sm transition-opacity duration-500",
     isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}
    onClick={toggleSidebar}
   >
    <div
     className={twMerge(
      "w-[80vw] h-full flex flex-col bg-secondary transform transition-transform duration-500",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
     )}
     onClick={(e) => e.stopPropagation()}
    >
     <div className="w-full p-4 shadow-lg flex bg-bg-nav justify-between items-center">
      <div className="h-6 items-center flex gap-4 justify-center">
       <button
        className="md:hidden"
        onClick={toggleSidebar}
       >
        <MenuIcon className="h-8 w-8" />
       </button>
       <a
        href="/"
        className="h-full"
       >
        <img
         className="w-full h-full hidden dark:block"
         src="/logos/mb-logo-dark-fade-3.svg"
         alt="Logo"
        />
        <img
         className="w-full h-full dark:hidden"
         src="/logos/mb-logo-light-fade-3.svg"
         alt="Logo"
        />
       </a>
      </div>
     </div>

     {/* Sidebar Navigation Links */}
     <div className="h-full flex flex-col px-2">
      <div className="flex flex-col gap-2 py-4">
       <h2 className="px-4 font-bold text-2xl">USŁUGI</h2>
       <a
        href="/services/all"
        className="px-4 py-2 rounded-lg hover:bg-black/15 transition-colors"
       >
        Wszystkie
       </a>
       <a
        href="/services/instagram"
        className="px-4 py-2 rounded-lg hover:bg-black/15 transition-colors"
       >
        Instagram
       </a>
       <a
        href="/services/tiktok"
        className="px-4 py-2 rounded-lg hover:bg-black/15 transition-colors"
       >
        TikTok
       </a>
       <a
        href="/services/other"
        className="px-4 py-2 rounded-lg hover:bg-black/15 transition-colors"
       >
        Pozostałe
       </a>
      </div>
      <div className="flex flex-col gap-2 py-4 border-t-2 border-secondary-zinc-300 dark:border-bg-nav">
       <a
        href="/cart"
        className="px-4 py-2 rounded-lg hover:bg-black/15 transition-colors"
       >
        Koszyk
       </a>
      </div>{" "}
      <div className="flex flex-col gap-2 py-4 border-t-2 border-secondary-zinc-300 dark:border-bg-nav">
       <a
        href="/terms-of-service"
        className="px-4 py-2 rounded-lg hover:bg-black/15 transition-colors"
       >
        Regulamin
       </a>
      </div>
     </div>

     {/* Theme Toggle Button */}
     <div className="flex flex-col justify-end p-4">
      <button
       className="flex items-center gap-2 p-4 rounded-md bg-zinc-200 hover:bg-zinc-300 dark:bg-bg-nav dark:hover:brightness-125"
       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
       {theme === "dark" ? (
        <>
         <Sun />
         <span>Jasny motyw</span>
        </>
       ) : (
        <>
         <Moon />
         <span>Ciemny motyw</span>
        </>
       )}
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

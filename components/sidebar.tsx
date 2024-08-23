"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { MenuIcon, Moon, Sun } from "lucide-react";

interface SidebarProps {
 isSidebarOpen: boolean;
 toggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
 const { theme, setTheme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) {
  return null;
 }

 return (
  <div>
   <div
    className={twMerge(
     "fixed left-0 top-0 h-screen w-screen bg-black/80 backdrop-blur-sm transition-opacity duration-500 sm:hidden",
     isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
    )}
    onClick={toggleSidebar}
   >
    <div
     className={twMerge(
      "flex h-full w-[80vw] transform flex-col bg-secondary transition-transform duration-500",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
     )}
     onClick={(e) => e.stopPropagation()}
    >
     <div className="flex w-full items-center justify-between bg-bg-nav p-4 shadow-lg">
      <div className="flex h-6 items-center justify-center gap-4">
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
     </div>
     <div className="flex h-full flex-col px-2">
      <div className="flex flex-col gap-2 py-4">
       <h2 className="px-4 text-2xl font-bold">USŁUGI</h2>
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
      <div className="border-secondary-zinc-300 flex flex-col gap-2 border-t-2 py-4 dark:border-bg-nav">
       <a
        href="/cart"
        className="rounded-lg px-4 py-2 transition-colors hover:bg-black/15"
       >
        Koszyk
       </a>
      </div>{" "}
      <div className="border-secondary-zinc-300 flex flex-col gap-2 border-t-2 py-4 dark:border-bg-nav">
       <a
        href="/terms-of-service"
        className="rounded-lg px-4 py-2 transition-colors hover:bg-black/15"
       >
        Regulamin
       </a>
      </div>
     </div>
     <div className="flex flex-col justify-end p-4">
      <button
       className="flex items-center gap-2 rounded-md bg-zinc-200 p-4 hover:bg-zinc-300 dark:bg-bg-nav dark:hover:brightness-125"
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

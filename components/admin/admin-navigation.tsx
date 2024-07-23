"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { BsMarkdown, BsReception0 } from "react-icons/bs";
import { MdHealthAndSafety, MdMenu, MdSell } from "react-icons/md";
import { BiCalculator, BiHome, BiLogOut } from "react-icons/bi";
import { useState } from "react";

const navData = [
 {
  title: "Główna",
  href: "/admin/home",
  icon: <BiHome className="w-6 h-6" />
 },
 {
  title: "Usługi",
  href: "/admin/services",
  icon: <MdSell className="w-6 h-6" />
 },
 {
  title: "Kalkulator",
  href: "/admin/calculator",
  icon: <BiCalculator className="w-6 h-6" />
 },
 {
  title: "Zamówienia",
  href: "/admin/orders",
  icon: <BsReception0 className="w-6 h-6" />
 },
 {
  title: "Admin",
  href: "/admin/security",
  icon: <MdHealthAndSafety className="w-6 h-6" />
 },
 {
  title: "Regulamin",
  href: "/admin/terms-of-service",
  icon: <BsMarkdown className="w-6 h-6" />
 },
 {
  title: "Wyloguj",
  href: "/admin/logout",
  icon: <BiLogOut className="w-6 h-6" />
 }
];

const AdminNavigation = () => {
 const pathname = usePathname();
 const [sidebarOpen, setSidebarOpen] = useState(false);

 return (
  <div className="relative">
   <div className="h-screen flex flex-col p-2 md:p-4 gap-2 border-r-2 border-white/10">
    <button
     key={"menu"}
     onClick={() => setSidebarOpen(true)}
     className="flex md:hidden items-center gap-4 md:text-xl py-2 px-2 md:py-4 md:px-6 rounded-lg text-white hover:bg-zinc-700 cursor-pointer transition"
    >
     <MdMenu className="w-6 h-6" />
     <div className="md:flex hidden">Menu</div>
    </button>
    {navData.map((nav, index) => (
     <Link
      key={index}
      href={nav.href}
      className={twMerge(
       "flex items-center gap-4 md:text-xl py-2 px-2 md:py-4 md:px-6 rounded-lg text-white hover:bg-zinc-700 cursor-pointer transition",
       index === navData.length - 1 && "mt-auto",
       pathname === nav.href && "bg-primary hover:bg-primary-light"
      )}
     >
      <div>{nav.icon}</div>
      <div className="md:flex hidden">{nav.title}</div>
     </Link>
    ))}
   </div>
   <div
    className={twMerge(
     "w-screen h-screen bg-black bg-opacity-0 absolute top-0 left-0 hidden md:hidden",
     sidebarOpen && "flex bg-opacity-70"
    )}
    onClick={() => setSidebarOpen(false)}
   >
    <div
     className={`fixed left-0 top-0 h-screen flex flex-col p-2 md:p-4 gap-2 border-r-2 border-white/10 transform transition-transform duration-300 bg-zinc-900 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
     }`}
    >
     <button
      key={"menu"}
      onClick={() => setSidebarOpen(false)}
      className="flex md:hidden items-center gap-2 md:gap-4 md:text-xl py-2 px-2 md:py-4 md:px-6 rounded-lg text-white hover:bg-zinc-700 cursor-pointer transition w-min"
     >
      <MdMenu className="w-6 h-6" />
      <div className="md:flex hidden">Menu</div>
     </button>
     {navData.map((nav, index) => (
      <Link
       key={index}
       href={nav.href}
       className={twMerge(
        "flex items-center gap-2 md:gap-4 md:text-xl py-2 px-2 md:py-4 md:px-6 rounded-lg text-white hover:bg-zinc-700 cursor-pointer transition",
        index === navData.length - 1 && "mt-auto",
        pathname === nav.href && "bg-primary hover:bg-primary-light"
       )}
      >
       {nav.icon}
       <div className="flex">{nav.title}</div>
      </Link>
     ))}
    </div>
   </div>
  </div>
 );
};

export default AdminNavigation;

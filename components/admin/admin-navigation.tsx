"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { MdArticle, MdMenu } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { BiHome, BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { TbShoppingCartCopy } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";

const navData = [
 {
  title: "Główna",
  href: "/admin/home",
  icon: <BiHome className="w-6 h-6" />
 },
 {
  title: "Usługi",
  href: "/admin/services",
  icon: <FaGear className="w-6 h-6" />
 },
 {
  title: "Zamówienia",
  href: "/admin/orders",
  icon: <TbShoppingCartCopy className="w-6 h-6" />
 },
 {
  title: "Klienci",
  href: "/admin/customers",
  icon: <BsPeopleFill className="w-6 h-6" />
 },
 {
  title: "Regulamin",
  href: "/admin/terms-of-service",
  icon: <MdArticle className="w-6 h-6" />
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
   {/* Sidebar */}
   {sidebarOpen && (
    <div
     onClick={() => setSidebarOpen(false)}
     className="h-screen w-screen bg-black bg-opacity-75 absolute top-0 left-0 z-10"
    >
     <div
      className={twMerge(
       "h-screen bg-zinc-900 w-64 fixed top-0 left-0 flex flex-col p-2 md:p-4 gap-2 border-r-2 border-white/10 transition-transform transform",
       sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ transition: "transform 0.3s ease-in-out" }}
     >
      <button
       key={"menu"}
       onClick={() => setSidebarOpen(false)}
       className="flex md:hidden items-center w-min gap-4 md:text-xl py-2 px-2 md:py-4 md:px-6 rounded-lg text-white hover:bg-zinc-700 cursor-pointer transition"
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
        <div>{nav.title}</div>
       </Link>
      ))}
     </div>
    </div>
   )}
  </div>
 );
};

export default AdminNavigation;

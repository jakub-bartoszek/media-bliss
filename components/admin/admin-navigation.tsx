"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCalculator, BiHome, BiLogOut } from "react-icons/bi";
import { BsMarkdown, BsReception0 } from "react-icons/bs";
import { MdHealthAndSafety, MdSell } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const navData = [
 { title: "Główna", href: "/admin/home", icon: <BiHome /> },
 { title: "Usługi", href: "/admin/services", icon: <MdSell /> },
 {
  title: "Kalkulator",
  href: "/admin/calculator",
  icon: <BiCalculator />
 },
 {
  title: "Zamówienia",
  href: "/admin/orders",
  icon: <BsReception0 />
 },
 {
  title: "Admin",
  href: "/admin/security",
  icon: <MdHealthAndSafety />
 },
 {
  title: "Regulamin",
  href: "/admin/terms-and-conditions",
  icon: <BsMarkdown />
 },
 { title: "Wyloguj", href: "/admin/logout", icon: <BiLogOut /> }
];

const AdminNavigation = () => {
 const pathname = usePathname();

 return (
  <div className="flex flex-col p-4 border-r-2 border-white/10">
   {navData.map((nav, index) => (
    <Link
     key={index}
     href={nav.href}
     className={twMerge(
      "flex items-center gap-4 text-xl py-4 px-6 rounded-lg text-white hover:bg-primary cursor-pointer transition",
      index === navData.length - 1 && "mt-auto",
      pathname === nav.href && "bg-primary"
     )}
    >
     {nav.icon}
     {nav.title}
    </Link>
   ))}
  </div>
 );
};

export default AdminNavigation;

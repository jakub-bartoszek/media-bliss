"use client";

import { useState } from "react";
import AdminNavigationButton from "./admin-navigation-button";
import AdminNavigationSidebar from "./admin-navigation-sidebar";
import AdminMenuButton from "./admin-menu-button";
import {
 MdAccountBalanceWallet,
 MdAccountBox,
 MdArticle
} from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { BiHome, BiLogOut, BiPackage } from "react-icons/bi";
import { TbShoppingCartCopy } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";

const navMap = [
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
  title: "Pakiety",
  href: "/admin/packages",
  icon: <BiPackage className="w-6 h-6" />
 },
 {
  title: "Konta",
  href: "/admin/accounts",
  icon: <MdAccountBox className="w-6 h-6" />
 },
 {
  title: "Cennik kont",
  href: "/admin/account-prices",
  icon: <MdAccountBalanceWallet className="w-6 h-6" />
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
 const [sidebarOpen, setSidebarOpen] = useState(false);

 return (
  <div className="relative">
   <div className="h-screen flex flex-col p-2 md:p-4 gap-2 border-r-2 border-white/10">
    <AdminMenuButton
     sidebarOpen={sidebarOpen}
     setSidebarOpen={setSidebarOpen}
    />
    {navMap.map((item, index) => (
     <AdminNavigationButton
      key={index}
      hideOnSmall={true}
      title={item.title}
      icon={item.icon}
      href={item.href}
      className={index === navMap.length - 1 ? "mb-0 mt-auto" : ""}
     />
    ))}
   </div>
   {sidebarOpen && (
    <AdminNavigationSidebar
     setSidebarOpen={setSidebarOpen}
     sidebarOpen={sidebarOpen}
     navMap={navMap}
    />
   )}
  </div>
 );
};

export default AdminNavigation;

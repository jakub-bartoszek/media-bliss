"use client";

import { Dispatch, SetStateAction } from "react";
import { MdMenu } from "react-icons/md";

interface AdminMenuButton {
 setSidebarOpen: Dispatch<SetStateAction<boolean>>;
 sidebarOpen: boolean;
}

const AdminMenuButton = ({ setSidebarOpen, sidebarOpen }: AdminMenuButton) => {
 return (
  <div
   onClick={() => setSidebarOpen(!sidebarOpen)}
   className="flex w-max md:hidden gap-x-4 rounded-lg p-4 text-white transition hover:brightness-125 hover:bg-zinc-800 hover:bg-gradient-to-bl from-white/20 cursor-pointer"
  >
   <MdMenu className="w-6 h-6" />
  </div>
 );
};

export default AdminMenuButton;

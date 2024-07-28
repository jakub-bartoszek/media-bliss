import { twMerge } from "tailwind-merge";
import AdminNavigationButton from "./admin-navigation-button";
import { Dispatch, SetStateAction } from "react";
import AdminMenuButton from "./admin-menu-button";

interface AdminNavigationSidebarProps {
 setSidebarOpen: Dispatch<SetStateAction<boolean>>;
 sidebarOpen: boolean;
 navMap: {
  title: string;
  href: string;
  icon: JSX.Element;
 }[];
}

const AdminNavigationSidebar = ({
 setSidebarOpen,
 sidebarOpen,
 navMap
}: AdminNavigationSidebarProps) => {
 return (
  <div
   className="h-screen w-screen bg-black bg-opacity-75 absolute top-0 left-0 z-10 md:hidden"
   onClick={() => setSidebarOpen(false)}
  >
   <div
    className={twMerge(
     "h-screen bg-zinc-900 w-64 fixed top-0 left-0 flex flex-col p-2 md:p-4 gap-2 border-r-2 border-white/10 transition-transform transform z-20",
     sidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}
    onClick={(e) => e.stopPropagation()}
   >
    <AdminMenuButton
     sidebarOpen={sidebarOpen}
     setSidebarOpen={setSidebarOpen}
    />
    {navMap.map((item, index) => (
     <AdminNavigationButton
      setSidebarOpen={setSidebarOpen}
      key={index}
      title={item.title}
      icon={item.icon}
      href={item.href}
      className={index === navMap.length - 1 ? "mb-0 mt-auto" : ""}
     />
    ))}
   </div>
  </div>
 );
};

export default AdminNavigationSidebar;

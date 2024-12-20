"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface AdminNavigationButtonProps {
 href: string;
 icon: ReactNode;
 title: string;
 className?: string;
 hideOnSmall?: boolean;
 setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

const AdminNavigationButton = ({
 href,
 icon,
 title,
 className,
 hideOnSmall,
 setSidebarOpen
}: AdminNavigationButtonProps) => {
 const pathname = usePathname();

 return (
  <Link
   onClick={setSidebarOpen && (() => setSidebarOpen(false))}
   href={href}
   className={twMerge(
    "flex w-full gap-x-4 rounded-lg p-2 md:p-4 text-white transition hover:brightness-125 hover:bg-zinc-800 hover:bg-gradient-to-bl from-white/20",
    pathname === href && "bg-gradient-to-bl",
    className
   )}
  >
   <div>{icon}</div>
   <div className={twMerge("", hideOnSmall && "md:flex hidden")}>{title}</div>
  </Link>
 );
};

export default AdminNavigationButton;

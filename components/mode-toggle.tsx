"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
 const { setTheme } = useTheme();

 return (
  <div className=" flex items-center justify-center">
   <button
    className="hidden dark:flex"
    onClick={() => setTheme("light")}
   >
    <Sun />
   </button>
   <button
    className="flex dark:hidden"
    onClick={() => setTheme("dark")}
   >
    <Moon />
   </button>
  </div>
 );
}

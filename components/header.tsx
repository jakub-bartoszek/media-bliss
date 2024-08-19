"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Navigation from "./navigation";

const Header = () => {
 const [showed, setShowed] = useState(false);
 const [opacity, setOpacity] = useState(0);

 useEffect(() => {
  const handleScroll = () => {
   const scrollY = window.scrollY;
   if (scrollY !== 0) {
    setOpacity(100);
   } else {
    setOpacity(0);
   }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);

 return (
  <header
   className={twMerge(
    "h-[56px] fixed top-0 left-0 w-full z-30 transition-all",
    (opacity > 0 || showed) &&
     "bg-white dark:bg-[#250f4a] shadow-[0_0_40px_rgba(0,0,0,0.2)]"
   )}
  >
   <Navigation
    showed={showed}
    setShowed={setShowed}
   />
  </header>
 );
};

export default Header;

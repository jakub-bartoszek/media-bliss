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
   if (scrollY >= 300) {
    setOpacity(100);
   } else if (scrollY >= 200) {
    setOpacity(66);
   } else if (scrollY >= 100) {
    setOpacity(33);
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
    "h-14 flex justify-center fixed top-0 left-0 w-full z-30 transition duration-500 border-b-2 border-transparent",
    showed && "bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)]",
    !showed &&
     opacity === 100 &&
     "bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)]",
    !showed && opacity === 66 && "bg-white/60",
    !showed && opacity === 33 && "bg-white/30",
    !showed && opacity === 0 && "bg-white/0"
   )}
  >
   <Navigation showed={showed} setShowed={setShowed}/>
  </header>
 );
};

export default Header;

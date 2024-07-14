"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
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

 const headerClasses = `h-14 flex justify-center fixed top-0 left-0 w-full z-30 transition border-b-2 border-transparent ${
  opacity === 100 && "bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)]"
 } ${opacity === 66 && "bg-white/60"} ${
  opacity === 33 && "bg-white/30"
 } ${opacity === 0 && "bg-white/0"}`;

 return (
  <>
   <header className={headerClasses}>
    <Navigation />
   </header>
   <main className="max-w-[1400px] ml-auto mr-auto">
    <div className="w-full min-h-screen h-full flex flex-col items-center pt-14">
     {children}
    </div>
   </main>
   <Footer />
  </>
 );
}

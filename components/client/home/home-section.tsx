"use client";

import { useIsVisible } from "@/lib/hooks/useIsVisible";
import { Inter } from "next/font/google";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface HomeSectionProps {
 header: string;
 description: string;
}

const inter = Inter({
 weight: "400",
 subsets: ["latin"]
});

const HomeSection = ({ header, description }: HomeSectionProps) => {
 const sectionRef = useRef(null);
 const isVisible = useIsVisible(sectionRef);

 return (
  <div
   ref={sectionRef}
   className={twMerge(
    "text-center mb-64 transition-opacity ease-in duration-700 opacity-0 p-4",
    isVisible && "opacity-100",
    inter.className
   )}
  >
   <h1 className="text-4xl font-bold mb-8">{header}</h1>
   <p className="text-black/70">{description}</p>
  </div>
 );
};

export default HomeSection;

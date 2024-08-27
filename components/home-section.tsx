"use client";

import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useIsVisible } from "@/lib/hooks/useIsVisible";

interface HomeSectionProps {
 header: string;
 description: string;
}

const HomeSection = ({ header, description }: HomeSectionProps) => {
 const sectionRef = useRef(null);
 const isVisible = useIsVisible(sectionRef);

 return (
  <div
   ref={sectionRef}
   className={twMerge(
    "text-center mb-64 transition-opacity ease-in duration-700 opacity-0 p-4",
    isVisible && "opacity-100"
   )}
  >
   <h1 className="text-4xl font-bold mb-8">{header}</h1>
   <p className="text-sm text-muted sm:text-base md:text-lg">{description}</p>
  </div>
 );
};

export default HomeSection;

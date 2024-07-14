"use client";

import { useIsVisible } from "@/hooks/useIsVisible";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

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
   className={`text-center mb-64 transition-opacity ease-in duration-700 ${
    isVisible ? "opacity-100" : "opacity-0"
   }`}
  >
   <h1 className="text-4xl font-bold mb-8">{header}</h1>
   <p className="text-black/70">{description}</p>
  </div>
 );
};

export default HomeSection;

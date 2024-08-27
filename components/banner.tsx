"use client";

import React from "react";
import { ReactTyped } from "react-typed";
import Button from "./button";

export const Banner = () => {
 const headings = [
  "Dostarczamy Twojej marce niezbędną uwagę!",
  "Budujemy wizerunek Twojej firmy!",
  "Osiągnij sukces dzięki naszym działaniom!"
 ];

 return (
  <div className="mt-[56px] flex h-[calc(100dvh-56px)] w-full flex-col items-center justify-center gap-4 p-8 text-center md:gap-8">
   <div className="flex h-1/2 w-full flex-col-reverse p-8 text-4xl font-semibold drop-shadow-md text-fade sm:text-5xl md:text-7xl">
    <ReactTyped
     strings={headings}
     typeSpeed={60}
     backSpeed={40}
     backDelay={2500}
     loop
     smartBackspace
    />
   </div>
   <div className="flex h-1/2 flex-col items-center gap-4 md:w-3/4">
    <p className="text-sm sm:text-base md:text-lg">
     W Media Bliss stawiamy na indywidualne podejście, oferując nowatorskie
     rozwiązania marketingowe dostosowane do potrzeb każdej firmy. Nasz
     doświadczony zespół pomoże Ci zbudować markę, zwiększyć popularność i
     efektywnie zarządzać budżetem reklamowym.
    </p>
    <a href="/services/all">
     <Button className="rounded-full bg-fade md:px-6 md:py-3 md:text-lg">
      Sprawdź naszą ofertę
     </Button>
    </a>
   </div>
  </div>
 );
};

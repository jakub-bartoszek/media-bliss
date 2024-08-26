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
   <div className="flex h-1/2 w-full flex-col-reverse p-8 text-5xl font-semibold text-fade md:text-7xl">
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
    <p className="md:text-lg">
     W Media Bliss, stawiamy na indywidualne podejście do każdego klienta.
     Zespół z wieloletnim doświadczeniem w branży marketingowej pomoże Ci
     zbudować wizerunek marki, zwiększyć popularność oraz efektywnie zarządzać
     budżetem reklamowym. Nasze nowatorskie rozwiązania są dostosowane do
     unikalnych potrzeb każdej firmy.
    </p>
    <Button className="rounded-full px-6 py-3 text-lg bg-fade">Sprawdź naszą ofertę</Button>
   </div>
  </div>
 );
};

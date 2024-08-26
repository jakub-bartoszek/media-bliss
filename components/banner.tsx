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
  <div className="h-[calc(100dvh-56px)] mt-[56px] w-full text-center justify-center items-center flex flex-col p-8 gap-4 md:gap-8">
   <div className="w-full h-1/2 flex flex-col-reverse font-semibold text-fade p-8 text-5xl md:text-7xl">
    <ReactTyped
     strings={headings}
     typeSpeed={60}
     backSpeed={40}
     backDelay={2500}
     loop
     smartBackspace
    />
   </div>
   <div className="h-1/2 md:w-3/4 gap-4 flex flex-col items-center">
    <p className="md:text-lg">
     W Media Bliss, stawiamy na indywidualne podejście do każdego klienta.
     Zespół z wieloletnim doświadczeniem w branży marketingowej pomoże Ci
     zbudować wizerunek marki, zwiększyć popularność oraz efektywnie zarządzać
     budżetem reklamowym. Nasze nowatorskie rozwiązania są dostosowane do
     unikalnych potrzeb każdej firmy.
    </p>
    <Button className="bg-fade rounded-full text-lg px-6 py-3">Sprawdź naszą ofertę</Button>
   </div>
  </div>
 );
};

import { Package } from "@prisma/client";
import { nanoid } from "nanoid";
import Button from "../button";
import { CartItem } from "@/types";
import { twMerge } from "tailwind-merge";

interface PackageTile {
 pkg: Package;
 onSelect: ({ name, category, price, requireLink }: CartItem) => void;
 className?: string;
}

export const PackageTile = ({ pkg, onSelect, className }: PackageTile) => {
 return (
  <div
   className={twMerge(
    "relative box-border flex w-full flex-shrink flex-col justify-between overflow-hidden rounded-md border-2 border-primary bg-white md:min-w-[260px] md:basis-0",
    className
   )}
  >
   {pkg.name === "Pakiet High" && (
    <div className="absolute -right-8 top-4 w-fit rotate-45 bg-primary px-8 py-1 text-xs text-white">
     Bestseller
    </div>
   )}
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">{pkg.name}</div>
     <div className="text-4xl font-bold text-primary">
      {parseFloat(pkg.price.toString())} PLN
     </div>
    </div>
    <div className="border-t-2 pt-4">
     <ul className="list-disc pl-4 marker:text-zinc-400">
      {pkg.benefits.map((item) => (
       <li key={nanoid()}>{item}</li>
      ))}
     </ul>
    </div>
   </div>
   <div className="flex items-center justify-center p-4">
    <Button
     className="w-full"
     onClick={() =>
      onSelect({
       id: nanoid(),
       name: pkg.name,
       category: pkg.category,
       price: parseFloat(pkg.price.toString()),
       requireLink: true
      })
     }
    >
     Dodaj do koszyka
    </Button>
   </div>
  </div>
 );
};

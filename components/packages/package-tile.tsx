import { Package } from "@prisma/client";
import { nanoid } from "nanoid";
import { CartItem } from "@/types";
import { twMerge } from "tailwind-merge";
import Button from "../button";

interface PackageTile {
 pkg: Package;
 onSelect: ({ name, category, price, requireLink }: CartItem) => void;
 className?: string;
 fake?: boolean;
}

export const PackageTile = ({
 pkg,
 onSelect,
 className,
 fake
}: PackageTile) => {
 return (
  <div
   className={twMerge(
    "relative box-border flex w-full flex-shrink flex-col justify-between overflow-hidden rounded-md border-2 border-accent bg-bg-content shadow-lg md:min-w-[260px] md:basis-0",
    className
   )}
  >
   {pkg.name === "Pakiet High" && (
    <div className="absolute -right-8 top-4 w-fit rotate-45 bg-accent text-white px-8 py-1 text-xs">
     Bestseller
    </div>
   )}
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">{pkg.name}</div>
     <div className="w-max text-4xl font-bold text-fade">
      {parseFloat(pkg.price.toString())} PLN
     </div>
    </div>
    <div className="border-t-2 border-secondary-muted pt-4">
     <ul className="flex list-disc flex-col gap-2 pl-4 marker:text-secondary-muted">
      {pkg.benefits.map((item) => (
       <li key={nanoid()}>{item}</li>
      ))}
     </ul>
    </div>
   </div>
   {!fake && (
    <div className="flex items-center justify-center p-4">
     <Button
      className="w-full bg-fade"
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
   )}
  </div>
 );
};

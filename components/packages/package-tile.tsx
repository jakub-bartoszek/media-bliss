import { Package } from "@prisma/client";
import { nanoid } from "nanoid";
import Button from "../button";
import { CartItem } from "@/types";
import { twMerge } from "tailwind-merge";

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
    "relative box-border flex w-full flex-shrink flex-col justify-between overflow-hidden rounded-md border-[3px] border-neon-purple bg-[#120b20] md:min-w-[260px] md:basis-0",
    className
   )}
  >
   {pkg.name === "Pakiet High" && (
    <div className="absolute -right-8 top-4 w-fit rotate-45 px-8 py-1 text-xs text-white bg-neon-purple">
     Bestseller
    </div>
   )}
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">{pkg.name}</div>
     <div className="text-4xl font-bold text-fade w-max">
      {parseFloat(pkg.price.toString())} PLN
     </div>
    </div>
    <div className="border-t-2 border-white/10 pt-4">
     <ul className="list-disc pl-4 marker:text-zinc-700 flex flex-col gap-2">
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

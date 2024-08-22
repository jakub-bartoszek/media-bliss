import { Category } from "@prisma/client";
import { LuLoader2 } from "react-icons/lu";
import usePackages from "@/lib/hooks/usePackages";
import { CartItem } from "@/types";
import { PackageTile } from "./packages/package-tile";
import Button from "./button";

interface HeaderSectionProps {
 category: Category;
 handleAddToCart: ({ name, category, price, requireLink }: CartItem) => void;
}
export const HeaderSection = ({
 category,
 handleAddToCart
}: HeaderSectionProps) => {
 const { packages, loading } = usePackages(category);

 const starterPackage = packages?.find(
  (item) => item.name === "Pakiet Starter"
 );
 const proPackage = packages?.find((item) => item.name === "Pakiet Pro");
 const highPackage = packages?.find((item) => item.name === "Pakiet High");

 const scrollToPackages = () => {
  const elementId =
   category === "Instagram" ? "instagram-packages" : "tiktok-packages";
  const section = document.getElementById(elementId);

  if (section) {
   const sectionTop = section.getBoundingClientRect().top + window.scrollY;

   const offsetPosition = sectionTop - 56;

   window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
   });
  }
 };

 return (
  <div className="flex h-screen w-full items-center gap-16 p-8">
   <div className="flex w-full flex-col items-center md:items-start lg:w-1/2">
    <h1 className="mb-4 py-2 text-center text-5xl font-bold text-fade md:text-left md:text-6xl">
     Usługi {category}
    </h1>
    <p className="mb-4 text-center text-lg md:text-left md:text-2xl">
     Poszerz swoje zasięgi i zyskaj nową popularność, która pozwoli ci dotrzeć
     do niespotykanej dotąd ilości osób.
    </p>
    <Button
     className="text-xl bg-fade"
     onClick={scrollToPackages}
    >
     Poznaj naszą ofertę
    </Button>
   </div>

   <div className="relative hidden h-full w-1/2 items-center justify-center lg:flex">
    {loading && <LuLoader2 className="h-16 w-16 animate-spin text-accent" />}

    {packages && (
     <>
      {starterPackage && (
       <PackageTile
        className="absolute left-0 h-[450px] w-[300px] scale-[80%] opacity-50"
        pkg={starterPackage}
        onSelect={handleAddToCart}
        fake
       />
      )}
      {proPackage && (
       <PackageTile
        className="absolute right-0 h-[450px] w-[300px] scale-[80%] opacity-50"
        pkg={proPackage}
        onSelect={handleAddToCart}
        fake
       />
      )}
      {highPackage && (
       <PackageTile
        className="h-[450px] w-[300px]"
        pkg={highPackage}
        onSelect={handleAddToCart}
       />
      )}
     </>
    )}
   </div>
  </div>
 );
};

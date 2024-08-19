import { Category } from "@prisma/client";
import { LuLoader2 } from "react-icons/lu";
import { PackageTile } from "./packages/package-tile";
import usePackages from "@/lib/hooks/usePackages";
import Button from "./button";
import { CartItem } from "@/types";

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
  <div className="w-full h-screen flex items-center gap-16 p-8">
   <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start">
    <h1 className="text-fade text-center md:text-left text-5xl md:text-6xl font-bold mb-4 py-2">
     Usługi {category}
    </h1>
    <p className="text-lg md:text-2xl mb-4 text-center md:text-left">
     Poszerz swoje zasięgi i zyskaj nową popularność, która pozwoli ci dotrzeć
     do niespotykanej dotąd ilości osób.
    </p>
    <Button
     className="bg-fade text-xl"
     onClick={scrollToPackages}
    >
     Poznaj naszą ofertę
    </Button>
   </div>

   <div className="w-1/2 h-full relative hidden lg:flex items-center justify-center">
    {loading && <LuLoader2 className="animate-spin w-16 h-16  " />}

    {packages && (
     <>
      {starterPackage && (
       <PackageTile
        className="w-[300px] h-[450px] absolute left-0 scale-[80%] opacity-50"
        pkg={starterPackage}
        onSelect={handleAddToCart}
        fake
       />
      )}
      {proPackage && (
       <PackageTile
        className="w-[300px] h-[450px] absolute right-0 scale-[80%] opacity-50"
        pkg={proPackage}
        onSelect={handleAddToCart}
        fake
       />
      )}
      {highPackage && (
       <PackageTile
        className="w-[300px] h-[450px]"
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

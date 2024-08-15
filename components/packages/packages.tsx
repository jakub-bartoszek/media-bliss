import usePackages from "@/lib/hooks/usePackages";
import { PackageTile } from "./package-tile";
import { nanoid } from "nanoid";
import { CartItem } from "@/types";
import { Category } from "@prisma/client";
import Loader from "../loader";
import Error from "../error";

interface PackagesProps {
 id?: string;
 category: Category;
 handleAddToCart: ({ name, category, price, requireLink }: CartItem) => void;
}

export const PackagesSection = ({
 id,
 category,
 handleAddToCart
}: PackagesProps) => {
 const { packages, loading, error } = usePackages(category);

 if (!packages) return null;

 return (
  <section
   id={id}
   className="flex flex-col gap-4 p-4"
  >
   <h2 className="text-center text-5xl font-bold text-primary">Pakiety</h2>
   {loading && <Loader />}
   {error && <Error />}
   <div className="mb-16 flex flex-wrap justify-center gap-4">
    {packages.map((item) => (
     <PackageTile
      pkg={item}
      key={nanoid()}
      onSelect={handleAddToCart}
     />
    ))}
   </div>
  </section>
 );
};

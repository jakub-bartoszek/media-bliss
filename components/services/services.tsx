import useServices from "@/lib/hooks/useServices";
import { ServiceTile } from "./service-tile";
import { nanoid } from "nanoid";
import { CartItem } from "@/types";
import { Category, Service } from "@prisma/client";
import Loader from "../loader";
import Error from "../error";

interface ServicesProps {
 category: Category;
 handleAddToCart: ({ name, category, price, requireLink }: CartItem) => void;
}

export const Services = ({ category, handleAddToCart }: ServicesProps) => {
 const { services, loading, error } = useServices(category);

 if (!services) return null;

 return (
  <section className="flex flex-col gap-4 p-4">
   <h2 className="text-center text-5xl font-bold text-primary">Usługi</h2>
   {loading && <Loader />}
   {error && <Error />}
   <div className="mb-16 flex flex-wrap justify-center gap-4">
    {services.map((item: Service) => (
     <ServiceTile
      service={item}
      key={nanoid()}
      onSelect={handleAddToCart}
     />
    ))}
   </div>
  </section>
 );
};

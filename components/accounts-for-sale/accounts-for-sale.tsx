import useAccounts from "@/lib/hooks/useAccounts";
import { CartItem } from "@/types";
import { Category } from "@prisma/client";
import { AccountTile } from "./account-tile";
import { nanoid } from "nanoid";
import Loader from "../loader";
import Error from "../error";

interface AccountsForSaleProps {
 category: Category;
 handleAddToCart: ({ name, category, price, requireLink }: CartItem) => void;
}

export const AccountsForSale = ({
 category,
 handleAddToCart
}: AccountsForSaleProps) => {
 const { accounts, loading, error } = useAccounts(category);

 if (accounts.length === 0) return null;

 return (
  <section className="flex flex-col gap-4 p-4">
   <h2 className="text-center text-5xl font-bold">Konta na sprzedaż</h2>
   {loading && <Loader />}
   {error && <Error />}
   <div className="mb-16 flex flex-wrap justify-center gap-4">
    {accounts.map((account) => (
     <AccountTile
      key={nanoid()}
      account={account}
      onSelect={handleAddToCart}
     />
    ))}
   </div>
  </section>
 );
};

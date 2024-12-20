import { AccountForSale } from "@prisma/client";
import Button from "../button";
import {
 buildStyles,
 CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CartItem } from "@/types";
import { nanoid } from "nanoid";

interface AccountTile {
 account: AccountForSale;
 onSelect: ({ id, name, category, price, requireLink }: CartItem) => void;
}

export const AccountTile = ({ account, onSelect }: AccountTile) => {
 return (
  <div className="relative box-border flex w-full flex-shrink flex-col justify-between overflow-hidden rounded-md border-2 border-accent bg-bg-content shadow-lg md:min-w-[260px] md:basis-0">
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">{`Konto ${account.category}`}</div>
     <div className="text-4xl font-bold text-fade">
      {parseFloat(account.price.toString())} PLN
     </div>
    </div>
    <div className="flex flex-col gap-4 border-t-2 border-secondary-muted pt-4">
     <div className="text-center text-xl">
      <span className="font-bold text-fade">{account.followerCount}</span>{" "}
      obserwacji
     </div>
     <div className="flex gap-4">
      <div className="flex w-1/3 flex-col items-center gap-2">
       <span className="md:text-sm">
        {account.predominantGender === "Male" ? "Mężczyzn" : "Kobiet"}
       </span>
       <div className="h-20 w-20 md:h-auto md:w-auto">
        <CircularProgressbarWithChildren
         value={account.genderPercentage}
         styles={buildStyles({
          pathColor: "#eb07ff",
          trailColor: "#00000055"
         })}
        >
         <span className="font-bold">{`${account.genderPercentage}%`}</span>
        </CircularProgressbarWithChildren>
       </div>
      </div>
      <div className="flex w-1/3 flex-col items-center gap-2">
       <span className="md:text-sm">Polaków</span>
       <div className="h-20 w-20 md:h-auto md:w-auto">
        <CircularProgressbarWithChildren
         value={account.polishPercentage}
         styles={buildStyles({
          pathColor: "#eb07ff",
          trailColor: "#00000055"
         })}
        >
         <span className="font-bold">{`${account.polishPercentage}%`}</span>
        </CircularProgressbarWithChildren>
       </div>
      </div>
      <div className="flex w-1/3 flex-col items-center gap-2">
       <span className="md:text-sm">18-24</span>
       <div className="h-20 w-20 md:h-auto md:w-auto">
        <CircularProgressbarWithChildren
         value={account.age18To24Percentage}
         styles={buildStyles({
          pathColor: "#eb07ff",
          trailColor: "#00000055"
         })}
        >
         <span className="font-bold">{`${account.age18To24Percentage}%`}</span>
        </CircularProgressbarWithChildren>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className="flex items-center justify-center p-4">
    <Button
     className="w-full bg-fade"
     onClick={() =>
      onSelect({
       id: `account-${account.category}-${account.id}-${nanoid()}`,
       name: `Konto ${account.category} × ${account.followerCount} obserwujących`,
       category: account.category,
       price: parseFloat(account.price.toString()),
       requireLink: false
      })
     }
    >
     Dodaj do koszyka
    </Button>
   </div>
  </div>
 );
};

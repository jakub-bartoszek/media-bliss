import {
 buildStyles,
 CircularProgressbarWithChildren
} from "react-circular-progressbar";
import Button from "../button";
import { AccountWithDecimalPrice } from "@/types";

interface AccountTileProps {
 account: AccountWithDecimalPrice;
 onSelect?: () => void;
}

const AccountTile = ({ account, onSelect }: AccountTileProps) => {
 return (
  <div
   key={account.id}
   className="bg-white rounded-md border-2 w-full sm:min-w-[260px] sm:basis-0 border-primary flex flex-col justify-between flex-shrink box-border relative overflow-hidden"
  >
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">Konto {account.category}</div>
     <div className="text-4xl font-bold text-primary">{account.price} PLN</div>
    </div>
    <div className="border-t-2 pt-4">
     <p className="text-2xl text-center mb-4">
      <span className="text-primary font-bold">{account.followsCount}</span>{" "}
      obserwacji
     </p>
     <div className="flex gap-4">
      <div>
       <p className="text-center">
        {account.genderType === "Male" ? "Mężczyzn" : "Kobiet"}
       </p>
       <CircularProgressbarWithChildren
        styles={buildStyles({
         pathColor: "#7038ff"
        })}
        value={account.genderPercentage}
       >
        <p className="text-center font-bold text-primary">
         {account.genderPercentage}%
        </p>
       </CircularProgressbarWithChildren>
      </div>
      <div>
       <p className="text-center">Polaków</p>
       <CircularProgressbarWithChildren
        value={account.polishFollowersPercentage}
        styles={buildStyles({
         pathColor: "#7038ff"
        })}
       >
        <p className="text-center font-bold text-primary">
         {account.polishFollowersPercentage}%
        </p>
       </CircularProgressbarWithChildren>
      </div>
      <div>
       <p className="text-center">18 - 24</p>
       <CircularProgressbarWithChildren
        value={account.age18to24Percentage}
        styles={buildStyles({
         pathColor: "#7038ff"
        })}
       >
        <p className="text-center font-bold text-primary">
         {account.age18to24Percentage}%
        </p>
       </CircularProgressbarWithChildren>
      </div>
     </div>
    </div>
   </div>
   <div className="flex items-center justify-center p-4 pt-0">
    <Button
     className="w-full"
     onClick={onSelect}
    >
     Dodaj do koszyka
    </Button>
   </div>
  </div>
 );
};

export default AccountTile;

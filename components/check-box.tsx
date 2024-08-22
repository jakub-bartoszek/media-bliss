import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface CheckBoxProps {
 onClick: () => void;
 className?: string;
 checked?: boolean;
}

const CheckBox = ({ onClick, className, checked }: CheckBoxProps) => {
 return (
  <div
   onClick={onClick}
   className={twMerge(
    "group w-min h-min p-1 border-2 border-accent rounded-lg flex items-center justify-center transition cursor-pointer",
    checked && "bg-accent hover:brightness-125 text-white",
    className
   )}
  >
   <FaCheck
    className={twMerge(
     "h-3 w-3 transition group-hover:scale-75 scale-0",
     checked && "scale-100 group-hover:scale-100"
    )}
   />
  </div>
 );
};

export default CheckBox;

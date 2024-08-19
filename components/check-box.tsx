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
    "group w-min h-min p-1 border-2 border-primary rounded-lg flex items-center justify-center transition cursor-pointer",
    checked &&
     "   bg-gradient-to-bl from-white/20 hover:brightness-125",
    className
   )}
  >
   <FaCheck
    className={twMerge(
     "text-white h-3 w-3 transition group-hover:  group-hover:scale-75 scale-0",
     checked && "scale-100 group-hover:text-white group-hover:scale-100"
    )}
   />
  </div>
 );
};

export default CheckBox;

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
 onClick?: () => void;
 children: ReactNode;
 className?: string;
 type?: "submit" | "reset" | "button" | undefined;
 disabled?: boolean;
}

const Button = ({
 onClick,
 children,
 className,
 type,
 disabled
}: ButtonProps) => {
 return (
  <button
   disabled={disabled}
   type={type}
   className={twMerge(
    "bg-primary bg-gradient-to-bl from-white/20 rounded-lg py-2 px-4 w-max text-white transition hover:brightness-125 disabled:bg-zinc-500 disabled:hover:brightness-100",
    className
   )}
   onClick={onClick}
  >
   {children}
  </button>
 );
};

export default Button;
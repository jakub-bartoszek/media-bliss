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
    "w-max whitespace-nowrap rounded-lg bg-accent bg-gradient-to-bl from-white/20 px-4 py-2 text-white transition hover:brightness-125 disabled:bg-zinc-600 disabled:bg-none disabled:hover:brightness-100",
    className
   )}
   onClick={onClick}
  >
   {children}
  </button>
 );
};

export default Button;

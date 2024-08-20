import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
 return (
  <div className="w-full flex items-center justify-center">
   <LuLoader2 className="animate-spin w-16 h-16 text-accent" />
  </div>
 );
};

export default Loader;

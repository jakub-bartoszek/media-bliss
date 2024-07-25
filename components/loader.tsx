import { LuLoader2 } from "react-icons/lu";

const Loader = () => {
 return (
  <div className="w-full h-screen flex items-center justify-center">
   <LuLoader2 className="animate-spin w-16 h-16 text-primary" />
  </div>
 );
};

export default Loader;

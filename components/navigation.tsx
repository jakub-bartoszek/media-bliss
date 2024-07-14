import { FaShoppingBag } from "react-icons/fa";

const Navigation = () => {
 return (
  <nav className="max-w-[1400px] w-full h-full p-4 flex justify-between items-center">
   <a className="h-full">
    <img
     className="w-full h-full"
     src="mb-logo-light-3.svg"
    />
   </a>
   <a>
    <FaShoppingBag className="h-6 w-6" />
   </a>
  </nav>
 );
};

export default Navigation;

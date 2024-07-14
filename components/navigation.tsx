import { FaShoppingBag } from "react-icons/fa";

const Navigation = () => {
 return (
  <nav className="max-w-[1400px] w-full h-full p-4 flex justify-between items-center">
   <a
    href="/"
    className="h-full"
   >
    <img
     className="w-full h-full"
     src="mb-logo-light-3.svg"
    />
   </a>
   <div className="flex gap-4">
    <a href="/services">Usługi</a>
    <a>
     <FaShoppingBag className="h-6 w-6" />
    </a>
   </div>
  </nav>
 );
};

export default Navigation;

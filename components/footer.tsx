import { BiPhone } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
 return (
  <footer className="bg-black text-gray-400 h-[300px] p-4 flex justify-center">
   <div className="w-full h-full max-w-[1400px] flex flex-col">
    <img
     className="w-64 mb-6"
     src="mb-logo-dark-3.svg"
    />
    <div className="flex flex-col justify-between h-full">
     <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center hover:text-white w-max">
       <div>
        <MdMailOutline className="w-6 h-6" />
       </div>
       <a href="mailto:kontakt@mediabliss.pl">
        kontakt@mediabliss.pl
       </a>
      </div>
      <div className="flex gap-2 items-center hover:text-white w-max">
       <div>
        <BiPhone className="w-6 h-6" />
       </div>
       <a href="tel:+48536-951-44">+48 536 951 442</a>
      </div>
      <div className="flex gap-2 items-center hover:text-white w-max">
       <div>
        <FaInstagram className="w-6 h-6" />
       </div>
       <a>mediabliss</a>
      </div>
     </div>
     <a
      className="hover:text-white w-max"
      href="/terms-of-service"
     >
      Regulamin
     </a>
    </div>
   </div>
  </footer>
 );
};

export default Footer;

import { BiPhone } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
 return (
  <footer className="bg-black text-zinc-400 h-[300px] p-4 flex justify-center">
   <div className="w-full h-full max-w-[1400px] flex flex-col">
    <img
     alt="Media Bliss"
     className="w-64 mb-6"
     src="/logos/mb-logo-dark-fade-3.svg"
    />
    <div className="flex flex-col justify-between h-full">
     <div className="flex flex-col gap-2">
      <a
       href="mailto:kontakt@mediabliss.pl"
       className="flex gap-2 items-center hover:text-white w-max"
      >
       <div>
        <MdMailOutline className="w-6 h-6" />
       </div>
       <span>kontakt@mediabliss.pl</span>
      </a>
      <a
       href="tel:+48536-951-442"
       className="flex gap-2 items-center hover:text-white w-max"
      >
       <div>
        <BiPhone className="w-6 h-6" />
       </div>
       <span>+48 536 951 442</span>
      </a>
      <a
       href="https://www.instagram.com/mediabliss_pl/"
       target="_blank"
       className="flex gap-2 items-center hover:text-white w-max"
      >
       <div>
        <FaInstagram className="w-6 h-6" />
       </div>
       <span>mediabliss</span>
      </a>
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

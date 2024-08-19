import { BiError } from "react-icons/bi";

const Error = () => {
 return (
  <div className="w-full flex flex-col items-center justify-center">
   <BiError className="w-48 h-48  " />
   <p className="text-3xl font-bold">Coś poszło nie tak...</p>
  </div>
 );
};

export default Error;

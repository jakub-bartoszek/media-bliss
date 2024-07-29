import { ReactNode } from "react";

interface ModalProps {
 title: string;
 onClose: () => void;
 children: ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => {
 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
   <div className="bg-white p-4 rounded-lg relative">
    <button
     onClick={onClose}
     className="absolute top-2 right-4 text-2xl"
    >
     &times;
    </button>
    <div className="mt-8 flex flex-col items-center gap-8">
     <h1 className="text-3xl font-bold whitespace-nowrap">{title}</h1>
     {children}
    </div>
   </div>
  </div>
 );
};

export default Modal;
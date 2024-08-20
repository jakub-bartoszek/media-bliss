import { ReactNode } from "react";

interface ModalProps {
 title: string;
 onClose: () => void;
 children: ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => {
 const handleBackgroundClick = (event: React.MouseEvent) => {
  if (event.target === event.currentTarget) {
   onClose();
  }
 };

 return (
  <div
   className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm transition-all"
   onClick={handleBackgroundClick}
  >
   <div
    className="relative rounded-lg bg-bg-content p-6 shadow-lg overflow-auto max-h-screen"
    onClick={(e) => e.stopPropagation()}
   >
    <div className="flex flex-col items-center">
     <h1 className="mb-4 font-bold text-3xl">{title}</h1>
     {children}
    </div>
   </div>
  </div>
 );
};

export default Modal;

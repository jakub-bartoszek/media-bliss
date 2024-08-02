import { ServiceWithDecimalPrice } from "@/types";
import Modal from "./modal";

interface LearnMoreModalProps {
 isOpen: boolean;
 onClose: () => void;
 service: ServiceWithDecimalPrice;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({
 isOpen,
 onClose,
 service
}) => {
 if (!isOpen) return null;

 return (
  <Modal
   title={service.name}
   onClose={onClose}
  >
   <div className="max-w-[500px]">
    <div className="mb-6 text-center text-lg">{service.description}</div>
    <ul className="list-disc marker:text-primary ml-6">
     {service.list.map((item, index) => (
      <li
       key={index}
       className="mb-2"
      >
       {item}
      </li>
     ))}
    </ul>
   </div>
  </Modal>
 );
};

export default LearnMoreModal;

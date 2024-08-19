import { nanoid } from "nanoid";
import Modal from "./modal";
import { Service } from "@prisma/client";

interface ServiceInfoModalProps {
 service: Service;
 isOpen: boolean;
 onClose: () => void;
}

const ServiceInfoModal = ({
 service,
 isOpen,
 onClose
}: ServiceInfoModalProps) => {
 if (!isOpen) return null;

 return (
  <Modal
   title={service.name}
   onClose={onClose}
  >
   <div className="flex flex-col gap-4 border-2 p-4 w-full rounded-md max-w-lg">
    <p className="text-lg">{service.description}</p>
    <ul className="list-disc ml-6 text-zinc-700">
     {service.benefits.map((benefit) => (
      <li key={nanoid()}>{benefit}</li>
     ))}
    </ul>
   </div>
  </Modal>
 );
};

export default ServiceInfoModal;

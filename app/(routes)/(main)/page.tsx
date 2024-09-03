import { Banner } from "@/components/banner";
import HomeSection from "@/components/home-section";
import { IoMegaphone } from "react-icons/io5";
import { FaLightbulb, FaMedal, FaWallet } from "react-icons/fa";
import { HiPuzzlePiece } from "react-icons/hi2";
import { FaUserShield } from "react-icons/fa6";
import { RiHandHeartFill } from "react-icons/ri";

const sections = [
 {
  icon: <IoMegaphone className="h-20 w-20 -rotate-12" />,
  header: "Zwiększanie popularności",
  description:
   "Specjalizujemy się w budowaniu zasięgów na platformach społecznościowych, co pozwala dotrzeć do szerokiej grupy odbiorców."
 },
 {
  icon: <FaLightbulb className="h-20 w-20" />,
  header: "Nowatorskie rozwiązania",
  description:
   "Każda usługa jest indywidualnie dostosowywana do potrzeb klienta, co zwiększa skuteczność działań promocyjnych."
 },
 {
  icon: <HiPuzzlePiece className="h-20 w-20" />,
  header: "Dostosowane usługi",
  description:
   "Każda usługa jest indywidualnie dostosowywana do potrzeb klienta, co zwiększa skuteczność działań promocyjnych."
 },
 {
  icon: <FaMedal className="h-20 w-20" />,
  header: "Doświadczenie i profesjonalizm",
  description:
   "Nasz zespół z wieloletnim doświadczeniem zapewnia wysoką jakość usług."
 },
 {
  icon: <FaUserShield className="h-20 w-20" />,
  header: "Budowanie wizerunku",
  description:
   "Pomagamy w kreowaniu i zarządzaniu wizerunkiem marki, co zwiększa zaufanie i wartość na rynku."
 },
 {
  icon: <RiHandHeartFill className="h-20 w-20" />,
  header: "Indywidualne podejście",
  description:
   "Traktujemy każdego klienta indywidualnie, dostosowując strategie do jego celów."
 },
 {
  icon: <FaWallet className="h-20 w-20" />,
  header: "Efektywne zarządzanie budżetem",
  description:
   "Nasze doświadczenie pozwala na maksymalizację zwrotu z inwestycji przy efektywnym zarządzaniu budżetami reklamowymi."
 }
];

export default function Home() {
 return (
  <div className="flex flex-col">
   <Banner />
   <div className="p-4">
    {sections.map((section, index) => (
     <HomeSection
      key={index}
      header={section.header}
      description={section.description}
      icon={section.icon}
     />
    ))}
   </div>
  </div>
 );
}

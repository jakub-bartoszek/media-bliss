import Button from "@/components/button";
import HomeSection from "@/components/home-section";

const sections = [
 {
  header: "Zwiększanie popularności",
  description:
   "Specjalizujemy się w budowaniu zasięgów na platformach społecznościowych, co pozwala dotrzeć do szerokiej grupy odbiorców."
 },
 {
  header: "Nowatorskie rozwiązania",
  description:
   "Każda usługa jest indywidualnie dostosowywana do potrzeb klienta, co zwiększa skuteczność działań promocyjnych."
 },
 {
  header: "Dostosowane usługi",
  description:
   "Każda usługa jest indywidualnie dostosowywana do potrzeb klienta, co zwiększa skuteczność działań promocyjnych."
 },
 {
  header: "Doświadczenie i profesjonalizm",
  description:
   "Nasz zespół z wieloletnim doświadczeniem zapewnia wysoką jakość usług."
 },
 {
  header: "Budowanie wizerunku",
  description:
   "Pomagamy w kreowaniu i zarządzaniu wizerunkiem marki, co zwiększa zaufanie i wartość na rynku."
 },
 {
  header: "Indywidualne podejście",
  description:
   "Traktujemy każdego klienta indywidualnie, dostosowując strategie do jego celów."
 },
 {
  header: "Efektywne zarządzanie budżetem",
  description:
   "Nasze doświadczenie pozwala na maksymalizację zwrotu z inwestycji przy efektywnym zarządzaniu budżetami reklamowymi."
 }
];

export default function Home() {
 return (
  <>
   <div className="h-screen flex justify-center items-center w-2/3 md:w-1/2">
    <div className="flex flex-col w-full items-center gap-8">
     <div className="animate-[logo-appear_2000ms] w-full h-full">
      <img
       className="hidden dark:block"
       alt="Media Bliss"
       src="/logos/mb-logo-dark-fade-1.svg"
      />
      <img
       className="dark:hidden"
       alt="Media Bliss"
       src="/logos/mb-logo-light-fade-1.svg"
      />
     </div>
     <a href="/services/all">
      <Button className="text-lg md:text-xl animate-[button-appear_2000ms] bg-fade">
       Sprawdź naszą ofertę
      </Button>
     </a>
    </div>
   </div>
   <div className="p-4">
    {sections.map((section, index) => (
     <HomeSection
      key={index}
      header={section.header}
      description={section.description}
     />
    ))}
   </div>
  </>
 );
}

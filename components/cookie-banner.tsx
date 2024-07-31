"use client";

import { useEffect, useState } from "react";
import Button from "./button";

export function getCookieConsent(): string {
 const consent =
  typeof window !== "undefined" ? localStorage.getItem("cookie_consent") : null;
 return consent ? consent : "undecided";
}

export default function CookieBanner() {
 const [consentGiven, setConsentGiven] = useState<string>("loading");

 useEffect(() => {
  const timeout = setTimeout(() => {
   setConsentGiven(getCookieConsent());
  }, 500);

  return () => clearTimeout(timeout);
 }, []);

 useEffect(() => {
  if (consentGiven === "yes" && typeof window.fbq === "function") {
   window.fbq("init", "1179062023217294");
   window.fbq("track", "PageView");
  }
 }, [consentGiven]);

 const handleAcceptCookies = () => {
  localStorage.setItem("cookie_consent", "yes");
  setConsentGiven("yes");
 };

 const handleDeclineCookies = () => {
  localStorage.setItem("cookie_consent", "no");
  setConsentGiven("no");
 };

 return (
  <div className="fixed bottom-0 left-0 w-full p-4">
   {consentGiven === "undecided" && (
    <div className="p-4 flex flex-col gap-4 bg-white border-2 rounded-lg shadow-[0_0_50px_0_#00000070] animate-slide-in-bottom max-w-[1400px] ml-auto mr-auto">
     <h1 className="text-primary font-bold text-2xl">Używamy plików cookie!</h1>
     <p>
      Używamy plików cookie, aby zrozumieć, jak korzystasz z naszego produktu, i
      aby pomóc nam go ulepszyć. Pliki cookie to małe fragmenty danych
      przechowywane na Twoim urządzeniu, które pomagają nam analizować ruch na
      stronie, dostosowywać treści i poprawiać doświadczenia użytkownika.
      Prosimy o zaakceptowanie plików cookie, aby pomóc nam w ulepszaniu naszej
      strony.
     </p>
     <div className="flex gap-2">
      <Button
       type="button"
       onClick={handleAcceptCookies}
      >
       Akceptuję
      </Button>
      <Button
       type="button"
       onClick={handleDeclineCookies}
      >
       Odrzucam
      </Button>
     </div>
    </div>
   )}
  </div>
 );
}

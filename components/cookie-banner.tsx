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

 if (consentGiven === "undecided") {
  return (
   <div className="fixed bottom-0 left-0 w-full p-4">
    <div className="p-4 flex flex-col gap-4 rounded-lg shadow-[0_0_25px_0_#00000030] animate-slide-in-bottom max-w-[1400px] ml-auto mr-auto bg-bg-content border-2 border-muted">
     <h1 className="font-bold text-2xl">Używamy plików cookie!</h1>
     <p className="text-muted">
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
       className="bg-fade"
      >
       Akceptuję
      </Button>
      <Button
       type="button"
       onClick={handleDeclineCookies}
       className="bg-fade"
      >
       Odrzucam
      </Button>
     </div>
    </div>
   </div>
  );
 }
}

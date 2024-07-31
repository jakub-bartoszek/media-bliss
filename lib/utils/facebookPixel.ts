import { cookieConsentGiven } from "@/components/cookie-banner";

export const trackPixelEvent = (
 eventName: string,
 eventData?: Record<string, any>
) => {
 if (
  typeof window !== "undefined" &&
  typeof window.fbq === "function" &&
  cookieConsentGiven() === "yes"
 ) {
  window.fbq("track", eventName, eventData);
 } else {
  console.warn("Facebook Pixel is not loaded yet or consent not given.");
 }
};

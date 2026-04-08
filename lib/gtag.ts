/** Default GA4 property; override with NEXT_PUBLIC_GA_MEASUREMENT_ID if needed. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-TVH2BHSQ6E";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

export function sendGtagPageView(url: string, title?: string) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
    send_page_view: true,
  });
}

export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}

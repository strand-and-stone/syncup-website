/** GA4 measurement ID used by the site. */
export const GA_MEASUREMENT_ID = "G-9WF4HK78WT";
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
  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: title,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}

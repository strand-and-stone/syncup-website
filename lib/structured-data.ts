import { SITE, STORE_LINKS } from "@/lib/constants";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.companyLegalName,
    url: SITE.domain,
    logo: `${SITE.domain}/icon.svg`,
    description:
      "SyncUpAlarm helps couples and partners wake up at the same time with synced iPhone alarms.",
    email: SITE.supportEmail,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    description:
      "Wake up together—even when you’re apart. Sync alarms with your partner on iPhone.",
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
    inLanguage: "en-US",
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE.name,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: STORE_LINKS.appStore,
    },
    downloadUrl: STORE_LINKS.appStore,
    description:
      "Partner alarm sync for iPhone using Apple’s AlarmKit for reliable alarms. Sync wake times with someone you care about.",
    author: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  };
}

export function getWebPageJsonLd(pathname: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE.domain}${pathname}`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    inLanguage: "en-US",
  };
}

import {
  APP_STORE_CTA_LIVE,
  ORGANIZATION_LEGAL_NAME,
  PRODUCT_ENTITY_NAME,
  SITE,
  STORE_LINKS,
} from "@/lib/constants";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: PRODUCT_ENTITY_NAME,
    legalName: ORGANIZATION_LEGAL_NAME,
    url: SITE.domain,
    logo: `${SITE.domain}/icon.svg`,
    description:
      "SyncUp: Partner Alarm Clock helps couples and partners wake up at the same time with synced iPhone alarms.",
    email: SITE.supportEmail,
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PRODUCT_ENTITY_NAME,
    url: SITE.domain,
    description:
      "Wake up together—even when you’re apart. Sync alarms with your partner on iPhone.",
    publisher: {
      "@type": "Organization",
      name: PRODUCT_ENTITY_NAME,
      url: SITE.domain,
    },
    inLanguage: "en-US",
  };
}

export function getSoftwareApplicationJsonLd() {
  const base = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "SyncUp: Partner Alarm Clock",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    softwareRequirements: "iOS 26.0+",
    description:
      "Partner alarm sync for iPhone using Apple’s AlarmKit for reliable alarms. Sync wake times with someone you care about.",
    author: {
      "@type": "Organization",
      name: PRODUCT_ENTITY_NAME,
      url: SITE.domain,
    },
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "AppleAppStore",
        value: "6760364103",
      },
    ],
  } as const;

  if (!APP_STORE_CTA_LIVE) {
    return {
      ...base,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
    };
  }

  return {
    ...base,
    offers: [
      {
        "@type": "Offer",
        name: "Pro (Monthly)",
        price: "3.99",
        priceCurrency: "USD",
        url: STORE_LINKS.appStore,
        category: "Subscription",
      },
      {
        "@type": "Offer",
        name: "Pro (Yearly)",
        price: "24.99",
        priceCurrency: "USD",
        url: STORE_LINKS.appStore,
        category: "Subscription",
      },
      {
        "@type": "Offer",
        name: "Pro (Lifetime)",
        price: "9.99",
        priceCurrency: "USD",
        url: STORE_LINKS.appStore,
      },
      {
        "@type": "Offer",
        name: "Bypass Alarm",
        price: "0.99",
        priceCurrency: "USD",
        url: STORE_LINKS.appStore,
      },
    ],
    downloadUrl: STORE_LINKS.appStore,
    installUrl: STORE_LINKS.appStore,
  };
}

export function getWebPageJsonLd(pathname: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE.domain}${pathname}`,
    isPartOf: {
      "@type": "WebSite",
      name: PRODUCT_ENTITY_NAME,
      url: SITE.domain,
    },
    inLanguage: "en-US",
  };
}

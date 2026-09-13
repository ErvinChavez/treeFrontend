import { SITE_URL } from "@/components/common/SEO";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Chavez Tree Service",
    image: `${SITE_URL}/chavezLogo.png`,
    telephone: "+14048861996",
    url: SITE_URL,
    areaServed: [
      { "@type": "City", name: "Lawrenceville, GA" },
      { "@type": "AdministrativeArea", name: "Gwinnett County, GA" },
      { "@type": "City", name: "Atlanta, GA" },
    ],
    priceRange: "$$",
    foundingDate: "1998",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
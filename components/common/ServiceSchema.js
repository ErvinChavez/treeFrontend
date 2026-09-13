import { SITE_URL } from "@/components/common/SEO";

export default function ServiceSchema({ services }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "Chavez Tree Service",
        telephone: "+14048861996",
        url: SITE_URL,
      },
      areaServed: [
        { "@type": "City", name: "Lawrenceville, GA" },
        { "@type": "AdministrativeArea", name: "Gwinnett County, GA" },
        { "@type": "City", name: "Atlanta, GA" },
      ],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
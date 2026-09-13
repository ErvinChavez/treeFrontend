import { useRouter } from "next/router";
import { createApolloClient } from "@/lib/apollo";
import { GET_SERVICES } from "@/lib/graphql/queries/services";
import { getToken } from "@/utils/auth";
import SEO from "@/components/common/SEO";
import LocalBusinessSchema from "@/components/common/LocalBusinessSchema";
import Image from "next/image";

export default function Home({ services }) {
  const router = useRouter();

  return (
    <>
      <SEO
        title="Chavez Tree Service | Tree Removal & Trimming in Atlanta, GA"
        description="Professional tree removal, tree trimming, stump grinding, land clearing, and emergency tree services in Lawrenceville, Gwinnett County, and the Atlanta metropolitan area."
        path="/"
      />
      <LocalBusinessSchema />

      <div className="min-h-screen flex flex-col">

        {/* HERO */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
          
            <div className="card p-8 text-center">
        
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="/chavezLogo.png"
                alt="Chavez Tree Service"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-brand-dark">
              Chavez Tree Service
            </h1>

            <h2 className="text-xl font-semibold text-gray-700 mt-2">
              Professional Tree Removal, Tree Trimming & Emergency Tree Services in Atlanta, GA
            </h2>

            <p className="text-sm font-medium text-brand-dark mt-3">
              Licensed & Insured • Serving Metro Atlanta Since 1998
            </p>

            <p className="text-muted max-w-xl mx-auto mt-3">
              Chavez Tree Service provides professional tree removal, tree trimming,
              stump grinding, land clearing, and emergency tree services throughout
              Lawrenceville, Gwinnett County, and the greater Atlanta metropolitan area.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap justify-center mt-6">
              <button
                onClick={() => router.push("/quote")}
                className="btn btn-primary"
              >
                Request a Quote
              </button>

              <button
                onClick={() => router.push(getToken() ? "/admin" : "/admin/login")}
                className="btn btn-outline"
              >
                Staff Sign In
              </button>
            </div>
          </div>
        </div>
        </section>

        {/* SERVICES */}
        <section className="section">
          <h2 className="section-title text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className="card card-interactive">
                <p className="text-subtitle">{service.name}</p>
                <p className="text-muted mt-1">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST / SOCIAL PROOF */}
        <section className="section-card text-center">
          <h2 className="text-title">
            Trusted by homeowners throughout Atlanta, Gwinnett County, and North Georgia
          </h2>
          <p className="text-muted">
            We take pride in delivering safe, efficient, and high-quality tree services.
          </p>
        </section>

        {/* CTA */}
        <section className="section text-center">
          <h2 className="text-title">Ready to get started?</h2>

          <button
            onClick={() => router.push("/quote")}
            className="btn btn-primary mt-4"
          >
            Get Your Free Quote
          </button>
        </section>

      </div>
    </>
  );

};

/* DATA FETCH */
export async function getStaticProps() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: GET_SERVICES,
  });

  return {
    props: {
      services: data.services,
    },
    revalidate: 60,
  };
}
import { useRouter } from "next/router";
import { createApolloClient } from "@/lib/apollo";
import { GET_SERVICES } from "@/lib/graphql/queries/services";
import { GET_FEEDBACK } from "@/lib/graphql/queries/feedback";
import { getToken } from "@/utils/auth";
import { getSeasonalHero } from "@/lib/hero";
import SEO from "@/components/common/SEO";
import LocalBusinessSchema from "@/components/common/LocalBusinessSchema";
import ServiceCard from "@/components/cards/ServiceCard";
import FeedbackCard from "@/components/cards/FeedbackCard";
import Image from "next/image";

export default function Home({ services, testimonials }) {
  const router = useRouter();
  const hero = getSeasonalHero();

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
        <section
          className="relative py-20 md:py-32 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero.image}), linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-wood-primary))`,
          }}
          role="img"
          aria-label={hero.alt}
        >
          {/* Dark overlay so white text stays readable over any photo */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative max-w-4xl mx-auto px-6 text-center text-white">

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="/chavezLogo.png"
                alt="Chavez Tree Service"
                width={80}
                height={80}
                className="object-contain bg-white rounded-full p-1"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-sm">
              Chavez Tree Service
            </h1>

            <h2 className="text-xl font-semibold text-white/90 mt-2">
              Professional Tree Removal, Tree Trimming & Emergency Tree Services in Atlanta, GA
            </h2>

            <p className="text-sm font-medium text-white/90 mt-3">
              Licensed & Insured • Serving Metro Atlanta Since 1998
            </p>

            <p className="text-white/80 max-w-xl mx-auto mt-3">
              Chavez Tree Service provides professional tree removal, tree trimming,
              stump grinding, land clearing, and emergency tree services throughout
              Lawrenceville, Gwinnett County, and the greater Atlanta metropolitan area.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap justify-center mt-6">
              <button
                onClick={() => router.push("/quote")}
                className="btn btn-accent"
              >
                Request a Quote
              </button>

              <button
                onClick={() => router.push(getToken() ? "/admin" : "/admin/login")}
                className="btn btn-outline border-white text-white hover:bg-white hover:text-brand-dark"
              >
                Staff Sign In
              </button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section">
          <h2 className="section-title text-center">
            Our Services
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
        </section>

        {/* TRUST / SOCIAL PROOF */}
        <section className="section-card text-center">
          {testimonials.length > 0 ? (
            <>
              <h2 className="text-title">What Our Customers Say</h2>

              <div className="grid gap-4 md:grid-cols-3 mt-4 text-left">
                {testimonials.map((feedback, i) => (
                  <FeedbackCard key={i} feedback={feedback} />
                ))}
              </div>

              <button
                onClick={() => router.push("/testimonials")}
                className="btn btn-outline mt-6"
              >
                Read More Reviews
              </button>
            </>
          ) : (
            <>
              <h2 className="text-title">
                Trusted by homeowners throughout Atlanta, Gwinnett County, and North Georgia
              </h2>
              <p className="text-muted">
                We take pride in delivering safe, efficient, and high-quality tree services.
              </p>
            </>
          )}
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

  const [servicesResult, feedbackResult] = await Promise.all([
    client.query({ query: GET_SERVICES }),
    client.query({ query: GET_FEEDBACK }),
  ]);

  const testimonials = feedbackResult.data.jobs
    .map((job) => job.feedback)
    .filter((feedback) => feedback && feedback.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return {
    props: {
      services: servicesResult.data.services,
      testimonials,
    },
    revalidate: 60,
  };
}
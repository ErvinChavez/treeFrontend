import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">

      {/* HERO */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="card p-8 text-center">
        
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/chavezLogo.png"
              alt="Chavez Tree Service"
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-brand-dark">
            Chavez Tree Service
          </h1>

          <p className="text-muted max-w-xl mx-auto mt-3">
            Professional tree removal, land clearing, and outdoor services you can trust.
            Fast quotes. Reliable crews. Quality work.
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
              nClick={() => router.push("/admin/login")}
              className="btn btn-outline"
            >
              Admin Login
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
          {[
            "Tree Removal",
            "Land Clearing",
            "Tree Trimming",
            "Emergency Tree Removal"
          ].map((service) => (
            <div key={service} className="card card-interactive">
              <p className="text-subtitle">{service}</p>
              <p className="text-muted mt-1">
                Professional and reliable {service.toLowerCase()} services tailored to your needs.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="section-card text-center">
        <h2 className="text-title">
          Trusted by homeowners across the Atlanta Metropolitan area
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
  );

};
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-white shadow-sm">
        
        {/* Logo */}
        <div className="mb-6 p-4 bg-white rounded-full shadow-md">
          <img
            src="/chavezLogo.png"
            alt="Chavez Tree Service"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800">
          Chavez Tree Service
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl">
          Professional tree removal, land clearing, and outdoor services you can trust.
          Fast quotes. Reliable crews. Quality work.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => router.push("/quote")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Request a Quote
          </button>

          <button
            onClick={() => router.push("/admin/login")}
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Admin Login
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Tree Removal",
            "Land Clearing",
            "Tree Trimming",
            "Emergency Tree Removal"
          ].map((service) => (
            <div
              key={service}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-green-700">
                {service}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Professional and reliable {service.toLowerCase()} services tailored to your needs.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="bg-green-600 text-white py-14 text-center px-6">
        <h2 className="text-2xl font-semibold">
          Trusted by homeowners across the Atlanta Metropolitan area
        </h2>
        <p className="mt-3 text-green-100">
          We take pride in delivering safe, efficient, and high-quality tree services.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ready to get started?
        </h2>

        <button
          onClick={() => router.push("/quote")}
          className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          Get Your Free Quote
        </button>
      </section>

    </div>
  );
}
import Link from "next/link";

export default function ClientNavbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo (acts as Home button) */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/chavezLogo.png"
            alt="Chavez Tree Service"
            className="h-8 w-8"
          />
          <span className="font-semibold text-brand-dark">
            Chavez Tree Service
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/services" className="hover:text-brand-dark transition">
            Services
          </Link>
          <Link href="/quote" className="hover:text-brand-dark transition">
            Get a Quote
          </Link>
          <Link href="/testimonials" className="hover:text-brand-dark transition">
            Testimonials
          </Link>

          {/* Call Button */}
          <a
            href="tel:4048861996"
            className="btn btn-primary ml-2"
          >
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
}
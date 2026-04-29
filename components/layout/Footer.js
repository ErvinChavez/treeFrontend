export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-12 border-t border-gray-800">

      {/* Logo row (NEW) */}
      <div className="flex justify-center pt-6">
        <img
          src="/chavezLogo.png"
          alt="Chavez Tree Service"
          className="h-14 w-auto opacity-90"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left - Copyright */}
        <p className="text-sm text-gray-400 text-center md:text-left">
          © 1998-{new Date().getFullYear()} Chavez Tree Service
        </p>

        {/* Center - Navigation */}
        <div className="flex gap-6 text-sm">
          <a href="/services" className="hover:text-brand-light transition">Services</a>
          <a href="/quote" className="hover:text-brand-light transition">Get a Quote</a>
          <a href="/testimonials" className="hover:text-brand-light transition">Testimonials</a>
        </div>

        {/* Right - Socials */}
        <div className="flex gap-4 items-center">
          <a
            href="https://www.facebook.com/ChavezTreeService/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/facebookLogo.png"
              alt="Facebook"
              className="h-6 w-6 hover:opacity-70 transition"
            />
          </a>

          <a
            href="https://www.instagram.com/chavez_tree"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="instagramLogo.png"
              alt="Instagram"
              className="h-6 w-6 hover:opacity-70 transition"
            />
          </a>
        </div>

      </div>
    </footer>
  );
};
export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-12 border-t border-white/10 pb-20 md:pb-0" >

      {/* Logo */}
      <div className="flex justify-center pt-6">
        <img
          src="/chavezLogo.png"
          alt="Chavez Tree Service"
          className="h-14 w-auto opacity-90"
        />
      </div>

      <div className="app-container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <p className="text-caption text-white/60 text-center md:text-left">
          © 1998-{new Date().getFullYear()} Chavez Tree Service
        </p>

        {/* Center */}
        <div className="flex flex-col items-center gap-2 text-sm">
          {/* Main links */}
          <div className="flex gap-6">
            <a href="/services" className="hover:text-brand-accent transition-base">
              Services
            </a>
            <a href="/quote" className="hover:text-brand-accent transition-base">
              Get a Quote
            </a>
            <a href="/testimonials" className="hover:text-brand-accent transition-base">
              Testimonials
            </a>
          </div>

          {/* Legal links (secondary row) */}
          <div className="flex gap-4 text-xs text-white/50">
            <a href="/privacy-policy" className="hover:text-white/80 transition-base">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-white/80 transition-base">
              Terms
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-4 items-center">
          <a
            href="https://www.facebook.com/ChavezTreeService/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/facebookLogo.png"
              alt="Facebook"
              className="h-6 w-6 hover:opacity-70 transition-base"
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
              className="h-6 w-6 hover:opacity-70 transition-base"
            />
          </a>
        </div>

      </div>
    </footer>
  );
};
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm">
          © 1998-{new Date().getFullYear()} Chavez Tree Service
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/services" className="hover:underline">Services</a>
          <a href="/quote" className="hover:underline">Get a Quote</a>
          <a href="/testimonials" className="hover:underline">Testimonials</a>
        </div>

        <div className="flex gap-4 mt-4 items-center">
          <a
            href="https://www.facebook.com/ChavezTreeService/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/facebookLogo.png"
              alt="Facebook"
              className="h-6 w-6 hover:opacity-75 transition"
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
              className="h-6 w-6 hover:opacity-75 transition"
            />

          </a>
        </div>

      </div>
    </footer>
  );
};
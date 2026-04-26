export default function({className = ""}) {
    return (
        <>
           {/* Desktop Button */}
            <a 
                href="tel:+4048861996" 
                className={`hidden md:inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition ${className}`}
            >
            Call Now  
            </a>

            {/* Mobile Sticky Button */}
            <a
                href="tel:+4048861996"
                className="fixed bottom-0 left-0 w-full bg-green-600 text-white text-center py-4 z-50 md:hidden"
            >
            Call Now
            </a> 
        </>
        
    )
}
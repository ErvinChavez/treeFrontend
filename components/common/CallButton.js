export default function({className = ""}) {
    return (
        <>
           {/* Desktop Button */}
            <a 
                href="tel:+4048861996" 
                className={`hidden md:inline-flex btn btn-accent ${className}`}
            >
            Call Now  
            </a>

            {/* Mobile Sticky Button */}
            <a
                href="tel:+4048861996"
                className="fixed bottom-0 left-0 w-full btn btn-accent rounded-none md:hidden z-50"
            >
            Call Now
            </a> 
        </>
        
    )
}
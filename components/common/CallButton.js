export default function({className = ""}) {
    const baseClasses = "btn btn-primary";

    return (
        <>
           {/* Desktop Button */}
            <a 
                href="tel:+4048861996" 
                className={`hidden md:inline-block ${baseClasses} px-6 py-3 shadow ${className}`}
            >
            Call Now  
            </a>

            {/* Mobile Sticky Button */}
            <a
                href="tel:+4048861996"
                className={`${baseClasses} md:hidden fixed bottom-0 left-0 w-full text-center py-4 z-50 shadow-lg rounded-none`}
            >
            Call Now
            </a> 
        </>
        
    )
}
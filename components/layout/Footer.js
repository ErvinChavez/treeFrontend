// // components/layout/Footer.js
// export default function Footer() {
//   return (
//     <footer className="bg-gray-100 py-6 mt-12">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
//         {/* Social links */}
//         <div className="mb-4 md:mb-0">
//           <span className="font-semibold mr-2">Follow us on:</span>
//           <a 
//             href="https://www.facebook.com/YourPage" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline mr-2"
//           >
//             Facebook
//           </a>
//           <a 
//             href="https://www.instagram.com/YourPage" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-pink-500 hover:underline mr-2"
//           >
//             Instagram
//           </a>
//         </div>

//         {/* Google reviews link */}
//         <div>
//           <a 
//             href="https://www.google.com/search?q=Chavez+Tree+Service+reviews" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-green-600 hover:underline"
//           >
//             See our Google Reviews
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

//ADD TO _app.js :
// import Footer from "@/components/layout/Footer";

// export default function Layout({ children }) {
//   return (
//     <>
//       {children}
//       <Footer />
//     </>
//   );
// }
// pages/_app.js
import '../styles/globals.css'; // import Tailwind and any global CSS

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />; // renders the current page
}
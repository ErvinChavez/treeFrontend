// pages/_app.js
import '../styles/globals.css'; // import Tailwind and any global CSS
import { ApolloProvider } from '@apollo/client'; //the wrapper component
import client from "../lib/apollo"; //the bridge with apollo.js
import Footer from "@/components/layout/Footer";


export default function App({ Component, pageProps }) {
  return (
    //Wrap the entire app in the ApolloProvider
    //This causes the client connection to every single page and component in your project
    <ApolloProvider client={client}>
      <>
        <Component {...pageProps} />
        <Footer />
      </>
      
    </ApolloProvider>
  );
}
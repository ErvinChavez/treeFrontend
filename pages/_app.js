// pages/_app.js
import '../styles/globals.css'; // import Tailwind and any global CSS
import { ApolloProvider } from '@apollo/client'; //the wrapper component
import { useRouter } from 'next/router';

import ClientNavbar from "@/components/layout/ClientNavbar";
import client from "../lib/apollo"; //the bridge with apollo.js
import Footer from "@/components/layout/Footer";
import CallButton from '@/components/common/CallButton';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    //Wrap the entire app in the ApolloProvider
    //This causes the client connection to every single page and component in your project
    <ApolloProvider client={client}>
      <>
        {!isAdmin && <ClientNavbar/>}

        <main className={!isAdmin ? "pb-20" : ""}>
          <Component {...pageProps} />
        </main>
        
        {!isAdmin && <CallButton />}
        {!isAdmin && <Footer />}
      </>
      
    </ApolloProvider>
  );
};
// pages/_app.js
import '../styles/globals.css'; // import Tailwind and any global CSS
 //the wrapper component
import { ApolloProvider } from "@apollo/client/react";
import { useRouter } from 'next/router';
import Head from 'next/head';

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
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        
        {!isAdmin && <ClientNavbar/>}

        <main className={!isAdmin ? "pb-20" : ""}>
          <Component {...pageProps} />
        </main>
        
        {!isAdmin && <CallButton />}
        {!isAdmin && <Footer />}
      </>
      
    </ApolloProvider>
  );
}
import { createApolloClient } from "@/lib/apollo";
import QuoteForm from "@/components/forms/QuoteForm";
import { GET_SERVICES } from "@/lib/graphql/queries/services";
import Head from "next/head";

export default function Quote({ services }) {
  return (
    <>
      <Head>
        <title>Get a Free Tree Service Quote | Chavez Tree Service</title>

        <meta
          name="description"
          content="Request a free estimate for tree removal, trimming, stump grinding, and emergency tree services in Atlanta and Gwinnett County."
        />
      </Head>
      <div className="section max-w-2xl mx-auto">
        <h1 className="page-title">Request a Tree Service Quote</h1>
        <p className="text-muted max-w-2xl mx-auto mb-6 ">
            Get a free, no-obligation estimate for tree removal, tree trimming,
            stump grinding, and emergency tree services in Lawrenceville,
            Gwinnett County, and the Metro Atlanta area.
        </p>
        <div className="card">
          <QuoteForm services={services}/>
        </div>
      </div>
    </>  
  );
}


//static generation
export async function getStaticProps() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: GET_SERVICES,
  });

  return {
    props: {
      services: data.services,
    },
    revalidate: 60,
  };
}
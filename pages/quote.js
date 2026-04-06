import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo";
import QuoteForm from "@/components/forms/QuoteForm";
import { GET_SERVICES } from "@/lib/graphql/queries/services";

export default function Quote({ services }) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Request a Quote</h1>
      
      <QuoteForm services={services}/>
    </div>
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
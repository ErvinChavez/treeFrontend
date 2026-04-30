import { createApolloClient } from "@/lib/apollo";
import QuoteForm from "@/components/forms/QuoteForm";
import { GET_SERVICES } from "@/lib/graphql/queries/services";

export default function Quote({ services }) {
  return (
    <div className="section max-w-2xl mx-auto">
      <h1 className="page-title">Request a Quote</h1>
      
      <div className="card">
        <QuoteForm services={services}/>
      </div>
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
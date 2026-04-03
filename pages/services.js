import { gql } from "@apollo/client"; //GraphQL query tag
import { createApolloClient } from "../lib/apollo";
import { GET_SERVICES } from "@/lib/graphql/queries/services";
import ServiceCard from "@/components/cards/ServiceCard";


//the component receives `services` as a prop from getStaticProps
export default function Services({ services }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>

      {/*Display each service in a grid */}
      <div className="grid gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service}/>
        ))}
      </div>
    </div>
  );
}

//getStaticProps runs at build time
//it fetches the data from the backend and passes it to the component as props
export async function getStaticProps() {
  const client = createApolloClient();

  try {
    //apollo client executes the query
    const { data } = await client.query({
      query: GET_SERVICES,
    });
    return {
      props: {
        services: data.services, //pass data to the component above
      },
      //rebuild page every 1 hour to fetch fresh data
      revalidate: 60,
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return { props: { services: [] } }; //fallback if query fails
  }
}

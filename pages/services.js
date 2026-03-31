import { gql } from "@apollo/client"; //GraphQL query tag
import { createApolloClient } from "../lib/apollo";

//define the GraphQL query
//this fetches the services data from the backend
const GET_SERVICES = gql`
  query {
    services {
      id
      name
      description
    }
  }
`;

//the component receives `services` as a prop from getStaticProps
export default function Services({ services }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>

      {/*Display each service in a grid */}
      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
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

import { createApolloClient } from "../lib/apollo";
import { GET_SERVICES } from "@/lib/graphql/queries/services";
import ServiceCard from "@/components/cards/ServiceCard";
import Head from "next/head";


//the component receives `services` as a prop from getStaticProps
export default function Services({ services }) {
  return (
    <>
      <Head>
        <title>Tree Services in Atlanta & Gwinnett County | Chavez Tree Service</title>

        <meta
          name="description"
          content="Professional tree removal, tree trimming, stump grinding, land clearing, and emergency tree services in Atlanta, Lawrenceville, and Gwinnett County."
        />
      </Head>

      <div className="section">
        <h1 className="page-title">Our Services</h1>

        <p className="text-muted max-w-2xl mb-6">
          Chavez Tree Service provides professional tree removal, tree trimming,
          stump grinding, land clearing, and emergency tree services throughout
          Atlanta, Gwinnett County, and North Georgia. We focus on safe, efficient,
          and affordable tree care for residential and commercial properties.

          During colder months, we also offer firewood delivery in the Metro
          Atlanta area, depending on seasonal availability.
        </p>
        
        {/*Display each service in a grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service}/>
          ))}
        </div>
      </div>
    </>
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

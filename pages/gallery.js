import Image from "next/image";
import { createApolloClient } from "@/lib/apollo";
import { GET_FEATURED_PHOTOS } from "@/lib/graphql/queries/photos";
import SEO from "@/components/common/SEO";

export default function Gallery({ photos }) {
  return (
    <>
      <SEO
        title="Our Work | Chavez Tree Service"
        description="See recent tree removal, trimming, and stump grinding work completed by Chavez Tree Service in Atlanta, Lawrenceville, and Gwinnett County."
        path="/gallery"
      />

      <div className="section">
        <h1 className="page-title">Our Work</h1>

        <p className="text-muted max-w-2xl mb-6">
          A look at recent tree removal, trimming, and stump grinding jobs
          completed throughout Atlanta, Lawrenceville, and Gwinnett County.
        </p>

        {photos.length === 0 ? (
          <p className="text-muted">Photos coming soon.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.id} className="card p-0 overflow-hidden">
                <Image
                  src={photo.url}
                  alt="Completed tree service work by Chavez Tree Service"
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = createApolloClient();

  try {
    const { data } = await client.query({ query: GET_FEATURED_PHOTOS });
    return {
      props: { photos: data.featuredPhotos },
      revalidate: 60,
    };
  } catch (error) {
    console.error("GraphQL Error:", error);
    return { props: { photos: [] } };
  }
}
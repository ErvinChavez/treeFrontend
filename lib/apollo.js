import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


// backend connection
const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
});

// auth middleware (browser only)
const authLink = setContext((_, { headers }) => {
  let token = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//CLIENT (used in browser with ApolloProvider)
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

//SERVER-SAFE CLIENT (used in getStaticProps)
export function createApolloClient() {
  return new ApolloClient({
    link: httpLink, //no authLink here
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}

export default client;
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// backend connection
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

// auth middleware (browser only)
const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
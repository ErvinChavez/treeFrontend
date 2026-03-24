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



// import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

// //create a link to backend GraphQL
// const httpLink = new HttpLink({
//     uri: "http://localhost:5000/graphql",
// });

// //security checkpoint that runs before every request
// const authLink = new ApolloLink((operation, forward) => {
//     //check if in browser not server and grab the saved user token
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//     //if a token exists, add it to request headers so server knows who it is
//     if (token) {
//         operation.setContext({
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//     }

//     //tell the request to move forward to the next step
//     return forward(operation);
// });

// //combine suth + http link
// const link = authLink.concat(httpLink);

// //Initialize Apollo client
// const client = new ApolloClient({
//     link, //combine the security checkpoint + the backend link
//     cache: new InMemoryCache(), //create a "brain" to remember data so you don't re-fetch it
// });

// export default client;
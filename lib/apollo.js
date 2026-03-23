import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

//create a link to backend GraphQL
const httpLink = new HttpLink({
    uri: "http://localhost:5000/graphql",
});

//security checkpoint that runs before every request
const authLink = new ApolloLink((operation, forward) => {
    //check if in browser not server and grab the saved user token
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    //if a token exists, add it to request headers so server knows who it is
    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    //tell the request to move forward to the next step
    return forward(operation);
});

//combine suth + http link
const link = authLink.concat(httpLink);

//Initialize Apollo client
const client = new ApolloClient({
    link, //combine the security checkpoint + the backend link
    cache: new InMemoryCache(), //create a "brain" to remember data so you don't re-fetch it
});

export default client;
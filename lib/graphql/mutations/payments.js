import { gql } from "@apollo/client";

//public: called from the /pay page when the client clicks "Pay Now"
export const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSessionForToken($token: String!) {
    createCheckoutSessionForToken(token: $token) {
      checkoutUrl
    }
  }
`;

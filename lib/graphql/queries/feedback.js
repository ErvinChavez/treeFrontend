import { gql } from "@apollo/client";

// Shared by /testimonials (full list) and the homepage (top few, as a
// preview). Pulled out of testimonials.js so both places query the same way
// instead of keeping two copies of this in sync.
export const GET_FEEDBACK = gql`
  query {
    jobs {
      id
      feedback {
        rating
        comment
      }
    }
  }
`;
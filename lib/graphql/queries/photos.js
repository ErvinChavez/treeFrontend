import { gql } from "@apollo/client";

export const GET_FEATURED_PHOTOS = gql`
  query {
    featuredPhotos {
      id
      url
    }
  }
`;
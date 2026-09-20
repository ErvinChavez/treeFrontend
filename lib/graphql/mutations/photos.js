import { gql } from "@apollo/client";

export const TOGGLE_FEATURED_PHOTO = gql`
  mutation ToggleFeaturedPhoto($id: Int!) {
    toggleFeaturedPhoto(id: $id) {
      id
      featured
    }
  }
`;
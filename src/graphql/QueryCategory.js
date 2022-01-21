import { gql } from "@apollo/client";

export const queryCategory = gql`
  query title($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        name
        gallery
        id
        prices {
          amount
          currency
        }
      }
    }
  }
`;

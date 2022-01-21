import { gql } from "@apollo/client";

export const queryAllProducts = gql`
  query {
    category {
      products {
        name
        id
        gallery
        prices {
          currency
          amount
        }
      }
    }
  }
`;

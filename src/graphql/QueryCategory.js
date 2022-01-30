import { gql } from "@apollo/client";

export const queryCategory = gql`
  query title($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        brand
        name
        gallery
        id
        inStock
        prices {
          amount
          currency
        }
        attributes {
          name
          id
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

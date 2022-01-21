import { gql } from "@apollo/client";

export const queryProduct = gql`
  query Product($id: String!) {
    product(id: $id) {
      name
      id
      gallery
      description
      prices {
        currency
        amount
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
`;

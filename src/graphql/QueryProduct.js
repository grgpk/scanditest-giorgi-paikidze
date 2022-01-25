import { gql } from "@apollo/client";

export const queryProduct = gql`
  query Product($id: String!) {
    product(id: $id) {
      brand
      name
      id
      gallery
      description
      prices {
        currency
        amount
      }
    }
  }
`;

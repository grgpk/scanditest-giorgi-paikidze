import { gql } from "@apollo/client";

export const queryAttributes = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
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

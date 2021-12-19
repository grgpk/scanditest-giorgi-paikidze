import { client } from "./GetCategory";
import { gql } from "@apollo/client";

export const GET_CLOTHES = client.query({
  query: gql`
    query {
      categories {
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
  `,
});

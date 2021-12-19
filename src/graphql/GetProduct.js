import { client } from "./GetCategory";
import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = client.query({
  query: gql`
    query {
      category {
        products {
          name
          id
          gallery
        }
      }
    }
  `,
});

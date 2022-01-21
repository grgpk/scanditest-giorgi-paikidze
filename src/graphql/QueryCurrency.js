import { gql } from "@apollo/client";

export const queryCurrency = gql`
  query {
    currencies
  }
`;

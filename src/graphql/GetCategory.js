import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const GET_CATEGORY = client.query({
  query: gql`
    query {
      categories {
        name
      }
    }
  `,
});

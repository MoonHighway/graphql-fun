import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

const storageType =
  process.env.REACT_APP_TEST_PLAYERS === "true"
    ? "sessionStorage"
    : "localStorage";

export const storage = window[storageType];

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });
const authLink = setContext((_, operation) => {
  const token = storage.getItem("token");
  if (token) {
    return {
      headers: {
        ...operation.headers,
        authorization: `Bearer ${token}`
      }
    };
  } else {
    return operation;
  }
});

const httpAuthLink = authLink.concat(httpLink);
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      authorization: storage.getItem("token")
    })
  }
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpAuthLink
);

const client = new ApolloClient({ cache, link });

export default function FunProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

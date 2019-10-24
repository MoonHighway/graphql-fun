import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import introspectionQueryResultData from "./introspection.json";

const storageType =
  process.env.REACT_APP_TEST_PLAYERS === "true"
    ? "sessionStorage"
    : "localStorage";

export const storage = window[storageType];

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI
});
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
const wsClient = new SubscriptionClient(
  process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS,
  {
    reconnect: true,
    reconnectionAttempts: 3,
    lazy: true,
    connectionParams: () => ({
      authorization: storage.getItem("token")
    })
  }
);

wsClient.onConnected(() => {
  console.log("connected to websocket");
  document.body.style.backgroundColor = null;
});

wsClient.onReconnecting(() => {
  console.log("reconnecting to websocket");
});

wsClient.onReconnected(() => {
  console.log("connected to websocket");
  document.body.style.backgroundColor = null;
});

wsClient.onDisconnected(() => {
  console.log("disconnected from websocket");
  if (wsClient.backoff.attempts >= 3) {
    setTimeout(() => {
      console.log(wsClient.client);
      if (!wsClient.client) {
        window.location.reload();
      }
    }, 1000);
  }
});

const wsLink = new WebSocketLink(wsClient);

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

// import Redis from "ioredis";

// const redis = new Redis(process.env.REDIS_URL);

import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { readFileSync } from "fs";
import { createContext } from "./context";
import resolvers from "./resolvers";
import path from "path";
import { printEnv } from "./lib";

const typeDefs = readFileSync(
  path.join(__dirname, "typeDefs.graphql"),
  "UTF-8"
);

const start = async port => {
  printEnv();

  const context = await createContext();

  const server = new ApolloServer({
    typeDefs,
    context,
    resolvers,
    introspection: true
  });

  const app = express();

  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql",
      subscriptionEndpoint: "/graphql"
    })
  );

  server.applyMiddleware({ app });
  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

  app.use((req, res, next) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "client", "build", "index.html")
    );
  });

  httpServer.listen({ port }, () => {
    console.log(`graphql.fun API running on port ${port}`);
  });
};

start(process.env.PORT || 4000);

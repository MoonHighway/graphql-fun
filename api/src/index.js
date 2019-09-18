import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
// import { readFileSync } from "fs";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
// import { createContext } from "./context";
// import resolvers from "./resolvers";
import path from "path";
import { printEnv } from "./lib";

//const typeDefs = readFileSync(path.join(__dirname, "schema.graphql"), "UTF-8");
const typeDefs = `
    type Query {
        gnar: String
    }
`;
const resolvers = {
  Query: {
    gnar: () => "gnarly!"
  }
};

const start = async port => {
  printEnv();

  // const context = await createContext();
  const server = new ApolloServer({
    typeDefs,
    // context,
    resolvers
    // introspection: true
    // mocks: true,
    // mockEntireSchema: false
  });

  const app = express();
  // app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql",
      subscriptionEndpoint: "/graphql"
    })
  );

  server.applyMiddleware({ app });
  const httpServer = createServer(app);
  // server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port }, () => {
    console.log(`graphql.fun API running on port ${port}`);
  });
};

start(process.env.PORT || 4000);

// // import typeDefs from "./typeDefs.graphql";
// // import resolvers from "./resolvers";
// // import { context } from "./context";

// const app = express();
// const httpServer = http.createServer(app);
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context
// });

// server.applyMiddleware({ app, cors: true });
// // server.installSubscriptionHandlers(httpServer);

// app.get("/", expressPlayground({ endpoint: "/graphql" }));

// // app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
// // app.use("/", express.static("./build"));
// // app.use("/board", express.static("./build"));
// // app.use("/pick", express.static("./build"));

// httpServer.listen(process.env.PORT || 4000, ({ url }) => {
//   console.log(`Server ready at ${url}`);
//   //   console.log(
//   //     `Subscriptions ready at ${process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS}`
//   //   );
// });

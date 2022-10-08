const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");

const { Query } = require("./resolvers/Query");
const { Product } = require("./resolvers/Product");
const { Category } = require("./resolvers/Category");
const { Mutation } = require("./resolvers/Mutation");

const { db } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
    Mutation
  },
  context: {
    db
  }
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
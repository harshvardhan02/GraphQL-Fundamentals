const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: [String!]! # it says that we need array of string (valiation) and whole array instead of null (valiation)
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
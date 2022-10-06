const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String!, #it should always return string data type (validation)
    numberOfAnimals: Int,
    price: Float,
    isCool: Boolean
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return "World!"
    },
    numberOfAnimals: () => {
      return 55;
    },
    price: () => {
      return 2345.1234
    },
    isCool: () => false
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
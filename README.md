
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## 1. Scaler Types



```javascript
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
```

## 2. Array Types

```javascript
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

------------------ Query -------------------

query {
  hello
}
```
## 3. Object Types



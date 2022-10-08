## Table of Contents

 - [Scaler Types](#1-scaler-types)
 - [Array Types](#2-array-types)
 - [Object Types](#3-object-types)
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

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    }
  }
}

// query {
//   products {
//     description,
//       name,
//       quantity
//   }
// }

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
```

## 4. Array of Objects

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    }
  }
}

// query {
//   products {
//     description,
//       name,
//       quantity
//   }
// }

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
```
## 4. Querying One Object with Variable

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
    product(id: ID!): Product
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    },
    product: (parent, args, context) => {
      const productId = args.id;
      console.log(productId)
      const product = products.find(product => product.id === productId);
      if (!product) return null;
      return product
    }
  }
}

// query {
//   product(id: "b553085a-a7e0-4c9b-8a12-f971919c3683") {
//     name,
//       description,
//   }
// }

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
```

## 5. Queries for categories

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category 
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    },
    product: (parent, args, context) => {
      const { id } = args;
      const product = products.find(product => product.id === id);
      if (!product) return null;
      return product
    },
    categories: () => {
      return categories
    },
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id)
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
```

## 6. Realting Data (one to many)

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category 
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    },
    product: (parent, args, context) => {
      const { id } = args;
      const product = products.find(product => product.id === id);
      if (!product) return null;
      return product
    },
    categories: () => {
      return categories
    },
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id)
    }
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId)
    }
  }
}

// query($categoryId: ID!) {
//   category(id: $categoryId) {
//     id
//     name
//     products {
//       name
//       description
//     }
//   }
// }

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})

```

## 7. Realting Data (many to one)

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category 
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    },
    product: (parent, args, context) => {
      const { id } = args;
      const product = products.find(product => product.id === id);
      if (!product) return null;
      return product
    },
    categories: () => {
      return categories
    },
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id)
    }
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId)
    }
  },
  Product: {
    category: (parent, args, context) => {
      const categoryId = parent.categoryId;
      return categories.find(category => category.id === categoryId);
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
```

## 8. Realting Data (one to many)

```javascript
const { ApolloServer, gql } = require("apollo-server");
const { categories, products, reviews } = require("./db");

const typeDefs = gql`
  type Query {
    hello: [String!]
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category 
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return ["Hello", "World", "GraphQL"]
    },
    products: () => {
      return products
    },
    product: (parent, args, context) => {
      const { id } = args;
      const product = products.find(product => product.id === id);
      if (!product) return null;
      return product
    },
    categories: () => {
      return categories
    },
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id)
    }
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId)
    }
  }
}

// query($categoryId: ID!) {
//   category(id: $categoryId) {
//     id
//     name
//     products {
//       name
//       description
//     }
//   }
// }

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log("server is running at " + url)
})
```

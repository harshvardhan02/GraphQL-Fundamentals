// const { products, categories } = require("../db");

exports.Query = {
  hello: (parent, args, context) => {
    return ["Hello", "World", "GraphQL"]
  },
  products: (parent, args, { products }) => {
    return products
  },
  product: (parent, { id }, { products }) => {
    const product = products.find(product => product.id === id);
    if (!product) return null;
    return product
  },
  categories: (parent, args, { categories }) => {
    return categories
  },
  category: (parent, { id }, { categories }) => {
    return categories.find((category) => category.id === id)
  }
}
// const { products } = require("../db");

exports.Category = {
  products: (parent, args, context) => {
    const products = context.products
    const categoryId = parent.id;
    return products.filter((product) => product.categoryId === categoryId)
  }
}

// we can also destrcuture like below approach

// exports.Category = {
//   products: ({ id: categoryId }, args, { products }) => {
//     return products.filter((product) => product.categoryId === categoryId)
//   }
// }
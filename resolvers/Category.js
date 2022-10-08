// const { products } = require("../db");

exports.Category = {
  products: (parent, args, { db }) => {
    const products = db.products
    const categoryId = parent.id;
    return db.products.filter((product) => product.categoryId === categoryId)
  }
}

// we can also destrcuture like below approach

// exports.Category = {
//   products: ({ id: categoryId }, args, { products }) => {
//     return products.filter((product) => product.categoryId === categoryId)
//   }
// }
// const { categories } = require("../db");

exports.Product = {
  category: (parent, args, { db }) => {
    const categories = db.categories;
    const categoryId = parent.categoryId;
    return categories.find(category => category.id === categoryId);
  },
  reviews: ({ id }, args, { reviews }) => {
    return reviews.filter(review => review.productId === id);
  }
}


// we can also destrcuture like below approach

// exports.Product = {
//   category: ({categoryID}, args, {db}) => {
//     const categories = context.categories;
//     return categories.find(category => category.id === categoryId);
//   }
// }
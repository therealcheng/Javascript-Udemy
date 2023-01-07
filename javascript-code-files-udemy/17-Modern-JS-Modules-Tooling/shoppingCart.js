// Exporting module

console.log(`Exporting Module`);

const shippingCost = 10;
const cart = []; // scopped to the current module

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };

export default (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

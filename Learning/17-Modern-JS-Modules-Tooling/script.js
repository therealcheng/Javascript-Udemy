// ! Importing modules
import * as ShoppingCart from './shoppingCart.js'; // '*' = everything
import cloneDeep from 'lodash'; // parcel enabled.
// console.log(`Importing module`);

// addToCart('bread', 5);
// console.log(price, totalQuantity);

// // Top level await in Functions
// const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// const data = await res.json();
// console.log(data); //Object { userId: 1}
ShoppingCart.addToCart('bread', 5);

// IIFY -  return just once
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered`);
  };
  //return public stuff
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);

// hot module reloading
if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

import 'core-js/stable/array/find.js';

const newFeature = product => {
  return product * 20;
};

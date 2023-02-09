'use strict';
/*
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// 🔴 Delayed Departure from FAO to TXL (11h25)
//    Arrival from BRU to FAO (11h45)
// 🔴 Delayed Arrival from HEL to FAO (12h05)
//     Departure from FAO to LIS (12h30)

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(36);
  console.log(output);
}

// Data needed for first part of the section
const restsaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[mainIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with 
    ${ing1}, ${ing2}, ${ing3}`);
  },

  openingHours: {
    //object in an object
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

//Coding Challenge #4
// using :
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    // console.log(row, first, second);

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/

// String methods 3

// split & join
console.log('a+very+nice+string'.split('+')); // Array(4) [ "a", "very", "nice", "string" ]
const [firstName, lastName] = 'Cheng Lim'.split(' '); // fn=Cheng lm=Lim
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // Mr. Cheng LIM

const capitaliseName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitaliseName('Jessica ann smith davis');
capitaliseName('jonas schmedtmann');

//Padding
const message = 'Go to Gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+'));

//mask
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(4658581265931016)); // take out 4 numbers and pad start with symbol.
console.log(maskCreditCard('335428679268272959'));

// Repeat Method
const message2 = 'Bad Weather... All departures Delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛫'.repeat(n)}`);
};
planesInLine(5);
planesInLine(14);

// String methods 1
const airline = 'British Airways';
const plane = 'A350-100';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Airways'));

console.log(airline.slice(8));
console.log(airline.slice(3, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B & E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log(`You got the middle seat 😤`);
  } else {
    console.log(`You got lucky 😁`);
  }
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// String methods 2
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix Capitalisation in Name
const passenger = 'jOnAS'; //Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//Comparing emails
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io\n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalisedEmail = loginEmail.toLowerCase().trim();
console.log(normalisedEmail);
console.log(email === normalisedEmail);

//replacing strings
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));

/*
//Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.startsWith('Air'));
console.log(plane.startsWith('A3'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log(`Part of NEW Airbus Family 💥`);
}

// Practice exercise 
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log(`You aren't welcome aboard :(`);
  } else {
    console.log(`Welcome aboard! :)`);
  }
};

checkBaggage(`I have a laptop, sone Food and a pocket Knife`); //uppercase
checkBaggage('Socks and camera');
checkBaggage('Got some snacks, and a gun for protection');


const question = new Map([
  ['question', 'What is the best programming languague?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct 😁'],
  [false, 'Try again! D:'],
]);
console.log(question);
console.log(Object.entries(restaurant.openingHours));

const hoursMap = new Map(Object.entries(restaurant.openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer'));
console.log(answer);
console.log(question.get(answer === 3));

console.log(question.get(question.get('correct') === answer));

// convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);


const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Fireze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest // adding more data to map
  .set('categories', ['Italian', 'Pizzeria', 'Vegetatian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(2);

const arr = [1, 2];
rest.set(arr, 'Test'); // adding array to Map
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));
//// sets
console.log(ordersSet);
console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Bread'));
console.log(ordersSet.has('Pasta'));

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

//example, removing dupes
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

//property names
for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day);
}

const properties = Object.keys(restaurant.openingHours);
console.log(properties);

let openStr = `we are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr);

//property values
const values = Object.values(restaurant.openingHours);
console.log(values);

// Entries Object
const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}


const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open;
  console.log(`On ${day}, we open at ${open}`);
}

// option chaining on methods

console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// option chaining on arrays
const users = [{ name: 'Jonas', email: 'hello@Jonas.io' }];

console.log(users[0]?.name ?? 'User array empty');
// For loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
////////// Nullish Coalescing Operator
restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests);

const guessCorrect = restaurant.numGuests ?? 10;
console.log(guessCorrect);

console.log(3 || 'jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 23;

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// && OP
console.log('---- AND OP ----');
console.log(7 && 'jonas');

//practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

//simpler way
guests1 && restaurant.orderPizza('Mushrooms', 'Spinach');


// Rest Patterns and Parameters

const arr = [1, 2, ...[3, 4]]; // right side of =, sprea

//REST, because left side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

const add = function (...numbers) {
  let sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

// edge cases
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

////////////

restaurant.orderDelivery({
   time: '22:30',
   address: 'Via del Sole, 21',
   mainIndex: 2,
   starterIndex: 2,
});


//////////// Destructuring Objects

// infunctions 
restaurant.orderDelivery({ starterIndex: 1, address: 'Via del Sole, 21' });


// basic
const { name, openingHours, categories } = restaurant;
//  ^ 3 brand new variables based on that array

console.log(name, openingHours, categories);

// defining different names for objects
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// setting def values when destructuring
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating def variables

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
console.log(a, b);

({ a, b } = obj); // needs to be in (parenthesis) because JS expects codeblock
console.log(a, b);

// Nested Objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//////////// Destructuring Arrays

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

//def values
const [p = 1, q = 1, r = 1] = [8, 9]; // lets pretend we don't know the length 
console.log(p,q,r);


// Spread operator

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...arr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];

console.log(newMenu);

//copying arrays

const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]; //main menu and starter menu
console.log(menu);

// works on iterable: iterable = things like arrays, strings, maps or sets, but not objects.
const str = 'Jonas';
const letters = [...str, '', 'S.'];
console.log(letters);

// function with spread op

// const ingredients = [
//   prompt(`let's make pasta! Ingredient 1?`),
//   prompt(`Ingredient 2?`),
//   prompt(`Ingredient 3?`),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

//Objects
const newRestaurant = {
  foundingYear: 1998,
  ...restaurant,
  founder: 'Guiseppi',
};
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Restorante Roma';
console.log(restaurantCopy.name, restaurant.name);
*/

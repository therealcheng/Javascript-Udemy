'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// ! BANKIST APP

// * Account Data
const account1 = {
  owner: 'Jonas Schmedtmann', //Owner Name
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300], // $ Movement
  interestRate: 1.2, // %
  pin: 1111, // Password Pin
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4]; // Combined

// * Elements DOMs
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements'); //movements
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// * FUNCTIONS

const displayMovements = function (movements, sort = false) {
  //!UNDERSTOOD
  //? List of € movements below current account
  containerMovements.innerHTML = ''; // ? div.movements

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'; // deposit or withdrawal
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>`;
    // multiline string - html element, replacing hard coded data with movements. We are inserting html element BUT not OVERIDING anything (DOM manipulation)
    // adding new movement row (element) to the same html. 2 strings:
    // 1 - position where we attact html, 2 - string containing html that we want to insert.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaySummary = function (acc) {
  // ! UNDERSTOOD
  // ? Shows div.summary of IN, OUT and INTEREST

  const incomes = acc.movements
    .filter(mov => mov > 0) // filter only > 0 (positive values)
    .reduce((acc, mov) => acc + mov, 0); // reduce (combines positive movement values)
  labelSumIn.textContent = `${incomes}€`; // shows sum of positve mov after calculation.

  const out = acc.movements // opposite of above
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // shows sum of out

  const interest = acc.movements
    .filter(mov => mov > 0) // interest for postive gain
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`; // shows interest
};

const createUsernames = function (accs) {
  //! UNDERSTOOD
  // ? Creates usernames js, jd, stw, ss - add username to all users

  accs.forEach(function (acc) {
    acc.username = acc.owner // account.username ='Jonas Schmedtmann'
      .toLowerCase() //jonas schmedtmann
      .split(' ') // Array [ "jonas", "schmedtmann" ]
      .map(name => name[0]) // Array [ "j", "s" ]
      .join(''); //js
  });
};
createUsernames(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); // ? calculating total balance
  labelBalance.textContent = `${acc.balance} €`; //shows on textContent in HTML
};

const updateUI = function (acc) {
  // ? Updates UI when login is successful.
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// * Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevents refresh of page

  currentAccount = accounts.find(
    //? find entered username value === current account ? undefined
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //? of pass is true, login:
    //Display UI and Wellcome message
    console.log(`LOGIN SUCCESSFUL`);

    // Display movements
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  //? Transfer and Update Array
  e.preventDefault(); // prevents default click where page reloads.

  const amount = Number(inputTransferAmount.value); // Transfer amount number typed.
  const receiverAcc = accounts.find(
    // Find in case value is above acc value
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
  updateUI(currentAccount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault(); // prevent default click

  if (
    //Find index method
    // ?if the close username and pass matches array
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    ); //finds array[]
    console.log(index); // gives array[0] if username js

    //delete acount using splice function
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;

    //clear fields
    inputCloseUsername.value = inputClosePin.value = ''; // clear input
  }
});

btnLoan.addEventListener('click', e => {
  //? Loan button click (SOME METHOD)
  e.preventDefault();
  const amount = Number(inputLoanAmount.value); //stores amount number

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // && checks if some movements is 10% of amount requested

    // Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = ' '; // resets input
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
const deposit = mov => mov > 0;
console.log(account1.movements.some(deposit));
console.log(account1.movements.every(deposit));
console.log(account1.movements.filter(deposit));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/*
// LECTURES

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//currency exchange using map method.
const eurToUsd = 1.1; // exchange rate

const movementsUSD = movements.map(mov => mov * eurToUsd);
// creates new array for movements * exchange rate

console.log(movements); // [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]
console.log(movementsUSD); // [200*1.1, etc]

// if return 23 instead in movementsUSD then we would get:
// [23,23,23,23,23,23,23,23]

const movementsUSDFor = [];

for (const mov of movements) movementsUSDFor.push(mov * eurToUsd);
console.log(movementsUSDFor);

const deposits = movements.filter(
  mov => mov > 0 // only get positive values in movements array.
);
console.log(deposits); // Array(5) [ 200, 450, 3000, 70, 1300 ] new deposits array.

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); //Array(3) [ -400, -650, -130 ]

const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur; // gives us sum of movements
}, 0); // the 0 is the starting snowball (accumulator)

// Parameters

// acc - accumulator (snowball)
// cur - current element
// i - current index
// arr - entire array

// console.log(balance); // 3840, sum of values

// max value of movements array *using reduce
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max); // 3000 which is the max value in the array

// Coding Challenge

const calcAverageHumanAge = function (ages) {
  //New Array with Dogs in Human age using Map.
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  // Array with Dogs above 18
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);
  // Average
  const averageAdultDog = adults.reduce(
    (acc, cur, i, arr) => acc + cur / arr.length,
    0
  );
  console.log(averageAdultDog);
  return averageAdultDog;
};

calcAverageHumanAge(dogsData1);
calcAverageHumanAge(dogsData2);

// Chaining like Pipeline:
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD); // 5522.000000000001

// Coding Challenge #3
const dogsData1 = [5, 2, 4, 1, 15, 8, 3];
const dogsData2 = [16, 6, 10, 5, 6, 1, 4];

const newCalcHumanAge = ages =>
ages
  .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter(age => age >= 18)
  .reduce((acc,cur,i,arr) => acc + cur / arr.length,0);

  console.log(newCalcHumanAge(dogsData1));
*/

// Find Function
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// finds Jessica Davis in accounts array
// console.log(account); // Object { owner: "Jessica Davis", movements: (8) […], interestRate: 1.5, pin: 2222, username: "jd" }

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //flats the array to:
// [1,2,3,4,5,6,7,8];

const arr2 = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arr2.flat(2));

const totalBalance = accounts.flatMap(acc => acc.movements);
// .reduce((acc, mov) => acc + mov, 0);
// console.log(totalBalance); // 17840

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //sorts alphabetically, mutates array

console.log(totalBalance); //
console.log(
  totalBalance.sort((a, b) => {
    //!sorts to ascending order! using compare function
    // a,b being 2 consecutive elements
    if (a > b) return 1; // keep order
    if (b > a) return -1; // switch order
  }) // loops over array until everything is in ascending order
); // ^ this simplifys to:
console.log(
  totalBalance.sort((a, b) => a - b) // loops over array until everything is in ascending order
);

const x = new Array(7); //*creates a new array with 7 empty elements
x.fill(1, 3, 5); //mutates entire array to contain 1, similar to slice
x.fill('woah', 2, 6);
console.log(x);

const y = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(y); //Array(7) [ 1, 2, 3, 4, 5, 6, 7 ]

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(movement => movement > 0)
  .reduce((acc, movement) => acc + movement, 0);
console.log(bankDepositSum);

// how many deposits in the bank with over 1000 dollars?
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length; // 6 deposits over 1000 dollars
console.log(numDeposits1000);

// reduce method
const numDeposits10002 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// if amount is over 1000, add to the count. Else ignore (0). * ++count prefix
console.log(numDeposits10002);

let a = 10;
console.log(++a);

// new object with reduce method
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a long title'));
console.log(convertTitleCase('and this is a long title'));

/*  CODING CHALLENGE 6.6.22
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
*/

// TEST DATA:
const dogs = [
  //4 arrays
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
const dogPortions = dogs.forEach(dog => {
  // adds element to Object.
  dog.recommendedFood = Math.trunc(Number(dog.weight) ** 0.75 * 28);
  console.log(dog.recommendedFood);
});
console.log(dogs);

//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

const overOrUnder = dog => {
  if (dog.curFood > dog.recommendedFood) {
    console.log(`${dog.owners[0]}'s dog is eating too much!`);
  } else {
    console.log(`${dog.owners[0]}'s dog is eating too little!`);
  }
};
overOrUnder(dogSarah);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dog eats too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eats too little!`);

//5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false) within a range 10% above and 10% below the recommended portion (see hint).

const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

//7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const eatingOkayArray = dogs.filter(checkEatingOkay);

//8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
const dogsCopy = dogs.slice().sort((a,b) => a.recommendedFood > b.recommendedFood)
console.log(dogsCopy);
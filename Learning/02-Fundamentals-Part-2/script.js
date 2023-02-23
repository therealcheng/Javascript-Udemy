// ? JS Fundenmentals Part 2
'use strict';
////////////////////////////////////////////////////////
/*
// ! Activating Strict Mode
'use strict';
let hasDriversLicence = false;
const passTest = true;

if (passTest) hasDriversLicence = true;
if (hasDriversLicence) console.log('I can drive ;D');
*/
////////////////////////////////////////////////////////
/*
// !Functions (Building Blocks)
function logger() {
    console.log('My name is Cheng');
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `juice with ${apples} apples and ${oranges} oranges`;
    return juice
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice)

const appleorangeJuice = fruitProcessor(6, 9);
console.log(appleorangeJuice)
*/
////////////////////////////////////////////////////////
/*
// !Function Declarations vs Expressions
// declaration (input[local variable])
function calcAge1(birthYear) {
    return 2037 - birthYear;;
}

const age1 = calcAge1(1991);
console.log(age1);

// Function Expression
const calcAge2 = function (birthYear) { //anonymous function
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);
console.log(age1, age2)
*/
////////////////////////////////////////////////////////
/*
//! Arrow Function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years`
}

console.log(yearsUntilRetirement(1980, 'Jonas'));
console.log(yearsUntilRetirement(1999, 'Catherine'));
*/
////////////////////////////////////////////////////////
/*
// !Functions callling other functions
// function within another function!

function cutFruitPieces(fruit) {
    return fruit * 4
}
function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`;
    return juice
}
console.log(fruitProcessor(2, 3))
*/
////////////////////////////////////////////////////////
/*
// !Revewing Functions

//* function =>
const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;

    return `${firstName} retires in ${retirement} years`
    // return retirement;
}

//* function ()
const yearsUntilRetirement = function (birthYear, firstName) {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years`
}
console.log(yearsUntilRetirement(1999, 'Jonas'));
*/

////////////////////////////////////////////////////////
/*
//! Coding Challenge #1
//* my method
const calcAvg = function (score1, score2, score3) {
    const average = (score1 + score2 + score3) / 3;
    return average
}
const avgDolphins = calcAvg(23, 999, 299);
const avgKoalas = calcAvg(2, 5, 9)

const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        return `Dolphins win (${avgDolphins} vs ${avgKoalas})`;
    } else if (avgKoalas >= 2 * avgDolphins) {
        return `Koalas win (${avgKoalas} vs ${avgDolphins})`;
    } else {
        return '-1'
    }
}
console.log(checkWinner(avgDolphins, avgKoalas))


//* solution

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
console.log(calcAverage(3, 4, 5));

const scoreDolphins = calcAverage(85, 54, 41);
const scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas)

const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        return `Dolphins win (${avgDolphins} vs ${avgKoalas})`;
    } else if (avgKoalas >= 2 * avgDolphins) {
        return `Koalas win (${avgKoalas} vs ${avgDolphins})`;
    } else {
        return 'No team is a winner...'
    }
}
console.log(checkWinner(scoreDolphins, scoreKoalas))
*/
////////////////////////////////////////////////////////
/*
//! Intro to Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAge = function (birthYeah) {
    return 2037 - birthYeah;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/

////////////////////////////////////////////////////////
/*
// Basic array operations

// adding elements to end of array
const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay'); //funciton - pass argument into functions, const returns length of array
console.log(friends);
console.log(newLength);

// adding elements to beginning of array
friends.unshift('John');
console.log(friends);

//removing elements from array [end]
friends.pop() ; // last element
const popped = friends.pop(); // logs array that was just removed
console.log(popped);
console.log(friends);

//removing elements from array [beginning]
friends.shift(); //first
console.log(friends);

// which positiion a certain element is in array
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); // -1 since doesn't exist

//ES6 method - returns true if element is in array
console.log(friends.includes('Steven'));
// precise - strict equality

if (friends.includes('Steven')) {
    console.log('You have a friend called Steven') ;
}
*/
////////////////////////////////////////////////////////

// Coding Challenge #2
/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.

2. And now let's use arrays! So create an array 'bills' containing the test data below.

3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.

4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉
GOOD LUCK 😀 */
/*
function calcTip(bill) {
    if (bill>=50 && bill<=300) {
        return bill*0.15
    } else {
        return bill*0.20
    }
}
console.log(calcTip(60)); //true

const bills = [125,555,44];
const tips = [calcTip(bills[0]),calcTip(bills[1]),calcTip(bills[2])];
console.log (bills,tips);

const total = [bills[0]+tips[0],bills[1]+tips[1],bills[2]+tips[2]];
console.log (total);
*/
////////////////////////////////////////////////////////
/*
// Intro to Objects

const jonasArray = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037-1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
}; //this Objects has 5 properties {object lateral syntax} - order doesn't matter.
// Use arrays for more ordered data, Objects for more unstructured data.
*/
////////////////////////////////////////////////////////
/*
// Dot vs Bracket notation
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037-1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);

console.log(jonas.lastName); //Dot Notation
console.log(jonas['lastName']); // Bracketing Notation

const nameKey = 'Name';
console.log(jonas['first' + nameKey]); //expression, plus operation creates firstName
console.log(jonas['last' + nameKey]); //lastName, doesn't work with dot.

// compute property name = bracket notation
// any other case = dot notation

const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, friends.');

//jonas[interestedIn]); linking corresponding object to prompt.

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job, friends.')
}

//using dots and brackets to add new properties to object.

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

//Challenge

// Try to concatenate 'Jonas has 3 friends, and his best friend is called Michael.'

 const descriptionJonas = `"${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}"`;
 console.log (descriptionJonas);
 // jonas.friends.length executed left to right

*/
////////////////////////////////////////////////////////
/*
// Object methods
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

     // calcAge: function(birthYear) {
     //     return 2037 - birthYear; // method/function 'expression'
     // }

     //  calcAge: function() {
     //     return 2037 - this.birthYear; // 'this' refers to the whole jonas object
     // } //jonas.birthYear violates calling jonas twice.

     calcAge: function() {
        this.age = 2037 - this.birthYear;
         return this.age;
     },
     getSummary: function () {
         return`${this.firstName} is a ${this.calcAge()}-years old ${this.job}, and he has ${this.hasDriversLicense === true ? "a": "no"} driver's license.`;
     },
};

// needing to reference age multiple time - we should calculate it and store it in an object and retrieve it later to save time. We do this by usign this.age = 2037- this.birthYear.
console.log(jonas.calcAge());  

console.log(jonas.age);    
console.log(jonas.age);    
console.log(jonas.age);    

// Challenge
// "Jonas is a 46-years old teacher, and he has a driver's license"

console.log(jonas.getSummary());
*/
////////////////////////////////////////////////////////
/*
// Coding Challenge #3
// my code
const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    },

}

const john = {
    firstName: 'John',
    lastName: 'Smith',
    mass: 92,
    height:1.95,
    calcBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
}

console.log(mark.calcBMI(), john.calcBMI())

console.log(mark.BMI > john.BMI ?
    `${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI}) is higher than ${john.firstName} ${john.lastName}'s BMI (${john.BMI})`
        
        : `${john.firstName} ${john.lastName}'s BMI (${john.BMI}) is higher than ${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI})`
        )

// rewritten code
const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    },

}

const john = {
    firstName: 'John',
    lastName: 'Smith',
    mass: 92,
    height:1.95,
    calcBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
}

mark.calcBMI();
john.calcBMI();
console.log(mark.BMI, john.BMI);

if (mark.BMI>john.BMI) {
    console.log(`${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI}) is higher than ${john.firstName} ${john.lastName}'s BMI (${john.BMI})`);
} else if (john.BMI>mark.BMI) {
    console.log(`${john.firstName} ${john.lastName}'s BMI (${john.BMI}) is higher than ${mark.firstName} ${mark.lastName}'s BMI (${mark.BMI})`);
} else {
    console.log(`Both have equal BMI! 😳`);
}
*/
////////////////////////////////////////////////////////
/*
// Iteration_ The for Loop, control structure. Automate repetitive tasks
// e.g. 10 reps at a gym.


// 3 steps - initial value of counter (1), maximum value of counter, maniputation of counter.

// for loop keeps running while condition is TRUE.
for(let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weigths repetition ${rep} 😳`);
}
*/
//////////////////////////////////////////////////////
// Looping Arrays, Breaking and Continuing
/*
const jonas = [
    'jonas',
    'Schmedtmann',
    2037-1991,
    'teacher',
    ['Michael','Peter','Steven'],
    true,
];//**Jonas [5] does not exist

const types = [];

// 'for loop' to loop through this array
for(let i = 0; i< jonas.length ; i++) { //since zero based
    //reading from jonas array
    console.log(jonas[i],typeof jonas[i]);

    // filling types array
    // types[i] = typeof jonas[i];
    types.push(typeof jonas[i]);
}

console.log(types); //newly filled array

const years = [1991,2007,1969,2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}

console.log(ages);



// continue and break
console.log('===only for strings===')
for(let i = 0; i< jonas.length ; i++) {

    if (typeof jonas[i] !=='string') {continue}
    console.log(jonas[i],typeof jonas[i]);
    }

console.log('===Break with number===')
for(let i = 0; i< jonas.length ; i++) {

    if (typeof jonas[i] ==='number') {break}
    console.log(jonas[i],typeof jonas[i]);
    }
*/
//////////////////////////////////////////////////////
/*
// Looping Backwards and Loops in Loops
const jonas = [
    'jonas',
    'Schmedtmann',
    2037-1991,
    'teacher',
    ['Michael','Peter','Steven'],
];

// reverse loops = 4,3......0

for (let i = jonas.length - 1; i >= 0; i--){
    console.log(i,jonas[i])
};

// loop inside a loop

for (let exercise =  1; exercise <=3; exercise++){
    console.log(`---------Starting exercise ${exercise}`);

    for(let rep = 1; rep <= 5; rep++){
        console.log(`Exercise ${exercise}: lifiting weight repetition ${rep} 😤`);
    }
}
*/
//////////////////////////////////////////////////////
/*
//While Loops

for(let rep = 1; rep <= 10; rep++) {
    // console.log(`FOR LOOP: Lifting weigths repetition ${rep}🏋️‍♀️`);
};

// it will run (while this condition is true)
let rep = 1; // doesn't relate to any counter
while (rep<= 10) {
// console.log(`WHILE LOOP: Lifting weigths repetition ${rep}🏋️‍♀️`);
rep++;
};

// Using while loop for random variable

let dice = Math.trunc(Math.random() * 6) +1; // random dice
console.log(dice);

while (dice !==6) {
    console.log(`you rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) +1;
if (dice=6) {
    console.log(`loop is about to end.`)
}
}
*/
//////////////////////////////////////////////////////

// Coding Challenge #4
/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀
*/
/*
const bills = [22,295,176,440,37,105,10,1100,86,52];
const tips = [];
const totals =[];

function calcTip(bill) { // from previous challenge
    if (bill>=50 && bill<=300) {
        return bill*0.15
    } else {
        return bill*0.20
    }
}

for(let i = 0; i< bills.length ; i++){ // i<.length because of zero sum.
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip+bills[i]);
}
console.log(bills,tips,totals);

//bonus: Write a function which takes an array and calculates the average of all numbers in the given array.
const calcAverage = function(arr){
    let sum = 0;
    for(let i = 0; i<arr.length; i++){
        // sum = sum + arr[i];
        sum += arr[i]; // adding the sum
    }
return sum/arr.length;
}

console.log(calcAverage([2,3,7]));
console.log(calcAverage(totals));
*/
///////////////////////////////////////////////////////

const x = [12, 24, 36, 48, 60, 72, 84, 96];
function calcCube(array) {
  let name = 0; //? declare name = 0 before loop
  for (let i = 0; i < array.length; i++) {
    //? for every increment, addda
    name += array[i];
  }
  console.log(name);
}

calcCube([8, 2, 2, 50]);
console.log('hello world');
console.log(`nah this is cool`);
console.log('omg!!!!');

// ? Javascript Fundenmentals Part I
console.log('test');
/*
// ? Notes from Udemy Course
// ! Assignments
let country = "United Kingdom";
let continent = "Europe";
let populationUK = 67220000;
const myFirstName = "Cheng";
const myLastName = 'Lim';

let PI = 3.1315; //Value which is a number
let myFirstJob = 'teacher'; //Value which is a String
let javascriptIsFun = true;

console.log(country);
console.log(continent);
console.log(populationUK);
console.log(javascriptIsFun);


javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);
console.log(typeof null);

let age = 30;
age = 31;
*/

/*
// ! LECTURE 5 : Basic Operators
let populationHalf = populationUK / 2;
console.log(populationHalf);

populationUK++
console.log(populationUK)

let populationFinland = 6000000;

console.log(populationUK > populationFinland); // Greater than

let averagePopulation = 33000000;
console.log(populationUK < averagePopulation)
*/

/*
// ! LECTURE 8 : Strings
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1992;
const year = 2037;

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`; // template literals
console.log(jonasNew)

console.log(`Just a regular string...`);

console.log('String with \n\
multiple \n\
lines');

console.log(`String
multiple
lines`)
*/
/*
//LECTURE : if and else statements
const age = 16;

if (age >= 18) {
    console.log(`Sarah can start driving license 🚗 `)
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);

//Coding Challenge #2

let massMark = 78;
let heightMark = 1.69;

let massJohn = 92;
let heightJohn = 1.95;

let BMIMark = massMark / heightMark ** 2; //27.30
let BMIJohn = massJohn / (heightJohn * heightJohn); //24.19
console.log(BMIMark, BMIJohn);

let markHigherBMI = BMIMark > BMIJohn;
console.log(markHigherBMI) //true

if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`)
}
*/
/*
// ! LECTURE 11: Type Conversion and Coercion

// Type Conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18); //output: 19918 which is obviously wrong, use Number

console.log(Number('Jonas')) //NaN "Not a number"
// Type Coercion

console.log('I am ' + 23 + ' years old')

console.log('23 ' + '10' + 3);
console.log('23 ' * '2');
console.log('23 ' > '18');
*/
/*
// ! LECTURE 12: Truthy and Falsy Values
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}))

const money = 100;
if (money) {
    console.log(`dont spend it all ;)`)
} else {
    console.log(` you should get a job!!`)
}

let height = 0;
if (height) {
    console.log(`YAY! Height is defined`)
} else {
    console.log(`NO! Height is undefined`)
}
*/

/*
// ! LECTURE13 = "LECTURE 13: Equality Operators_ == vs. ==="

const age = 18;
if (age === 18) console.log(`you just became ADULT :D`);

const favourite = Number(prompt(`what is your favourite number?`));
console.log(favourite);

if (favourite === 23) { //'23' == 23
    console.log(`Cool 23 is a amazing number!!!`)
} else if (favourite === 7) {
    console.log(` 7 is also a cool number!`)
} else if (favourite === 9) {
    console.log(`9 is also a cool number!`)
} else {
    console.log(`Number is not 23 or 7 or 9`)
}
if (favourite !== 23) console.log(`Why not 23?`);
*/

/*
// ! LECTURE 15: Logical Operators (Boolean Logic)

const hasDriversLicense = true
const hasTwoHands = true
const isTired = true

console.log(hasDriversLicense || hasTwoHands || isTired)

if (hasDriversLicense && hasTwoHands && !isTired) {
    console.log(`Well done, you are applicable to be able to drive!!`)
} else {
    console.log(`You are not eligable to be able to drive a car!!`)
}
*/

/*
// ! LECTURE 16: CODING CHALLENGE #3
//Data Table
const firstScoreDolphin = 97;
const secondScoreDolphin = 112;
const thirdScoreDolphin = 101;

const firstScoreKoalas = 109;
const secondScoreKoalas = 95;
const thirdScoreKoalas = 106;

//Average Scores
const averageScoreDolphin = (firstScoreDolphin + secondScoreDolphin + thirdScoreDolphin) / 3;
const averageScoreKoalas = (firstScoreKoalas + secondScoreKoalas + thirdScoreKoalas) / 3;
console.log(averageScoreDolphin);
console.log(averageScoreKoalas);


//Without Bonus
if (averageScoreDolphin > averageScoreKoalas) {
    console.log(`Team Dolphin with ${averageScoreDolphin} Points is the Winner!!!`)
} else if (averageScoreDolphin === averageScoreKoalas) {
    console.log(`Both teams are drawn!`)
} else {
    console.log(`Team Koalas with ${averageScoreKoalas} points is the Winner!!!`)
}
*/
/*

// Bonus 1 & 2
let aboveMinimumScoreDolphin

if (averageScoreDolphin > 100) {
    aboveMinimumScoreDolphin = true
} else {
    aboveMinimumScoreDolphin = false
}
console.log(aboveMinimumScoreDolphin);

let aboveMinimumScoreKoalas

if (averageScoreKoalas > 100) {
    aboveMinimumScoreKoalas = true
} else {
    aboveMinimumScoreKoalas = false
}
console.log(aboveMinimumScoreKoalas);


if (averageScoreDolphin > averageScoreKoalas && aboveMinimumScoreDolphin) {
    console.log(`Team Dolphin with average points of ${averageScoreDolphin} Points is the Winner!!!`)
} else if (averageScoreKoalas > averageScoreDolphin && aboveMinimumScoreKoalas) {
    console.log(`Team Koalas with average points of ${averageScoreKoalas} Points is the Winner!!!`)
} else if (averageScoreDolphin === averageScoreKoalas && aboveMinimumScoreDolphin && aboveMinimumScoreKoalas) {
    console.log(`Both Teams are Drawn!`)
} else {
    console.log(`Both Teams have less than 100 points so there are no eligable winners!`)
}
*/
/*
// ! Lecture 17: Switch
const day = 'monday';

// Using If and Else
if (day === 'monday') {
    console.log('Plan my week');
    console.log('Go to coding meet-up');
} else if (day === 'tuesday') {
    console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
    console.log('Write code examples');
} else if (day === 'friday') {
    console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
    console.log('Enjoy the weekend!');
} else {
    console.log('Not a valid day');
}

//Using Switch
switch (day) {
    case 'monday':
        console.log('Plan my week');
        console.log('Go to conding meetup');
        break;
    case 'tuesday':
        console.log('Do something else');
        break;
    case 'wednesday':
    case 'thurday':
        console.log('Do something else else');
        break;
    case 'friday':
        console.log('somethign else else else')
}
*/
/*
// !LECTURE 19: The Ternery Operator
const age = 18;
age >= 18 ? console.log('I can drink Wine 🍷🍷') : console.log('Cannot drink wine :(');

const drink = age >= 18 ? 'I can drink Wine 🍷🍷' : 'Cannot drink wine :('
console.log(drink)

console.log(`So....   ${age >= 18 ? 'I can drink Wine 🍷🍷' : 'Cannot drink wine :('}`);

// !LECTURE 20: Coding Challenge #4

const bill = 430;

// * ternary operator
bill >= 50 && bill <= 300
  ? console.log(`$${bill * 0.15} 😉`)
  : console.log(`$${bill * 0.2} 😙`);

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(tip);

//* Print String to console containing bill value, the tip and the final value.
console.log(
  `The bill was $${bill}, the tip was $${tip} and the total value $${
    bill + tip
  }`
);
*/

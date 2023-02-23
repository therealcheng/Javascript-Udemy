"use strict";
/*
function calcAge(birthYear) {
	// global scope - creates own scope
	const age = 2037 - birthYear;

	function printAge() {
		let output = `${firstName} you are the ${age} born in ${birthYear}.`;
		console.log(output);

		if (birthYear >= 1981 && birthYear <= 1996) {
			var millenial = true;
			const firstName = "Steven";
			const str = `Oh, and you're a millenial, ${firstName}`;

			console.log(str);

			function add(a, b) {
				return a + b;
			}

			output = 'NEW OUTPUT'
		}
		// console.log(str);
		console.log(millenial);
		// console.log(add(2, 3));
		console.log(output);
	}
	printAge();
	return;
}

const firstName = "Jonas";
calcAge(1991);

// console.log(output);
// console.log(printAge);  // both won't work

/////////////////////////////
// Hoisting and TDZ in practice:


if (!numProducts) deleteShopppingCart();

var numProducts = 10;


function deleteShopppingCart() {
	console.log('ALL SHOPPING CARTS DELETED!');

}

*/
////////////////// this keyword in practice
/*
console.log(this);

const calcAge = function (birthYear) {
	console.log(2037 - birthYear);
	// console.log(this);
};
calcAge(1991);

const calcAgeArrow = (birthYear) => {
	console.log(2037 - birthYear);
	// console.log(this);
};
calcAgeArrow(1980);

const jonas = {
	year: 1991,
	calcAge: function () {
		console.log(this);
		console.log(2037 - this.year);
	},
};
jonas.calcAge();



const matilda = {
	year: 2017,
};

matilda.calcAge = jonas.calcAge
matilda.calcAge();

const f = jonas.calcAge;
f();

*/
/*
////////////////// regular function vs arrow function

const jonas = {
	firstName: "Jonas",
	year: 1991,
	calcAge: function () {
		console.log(this);
		console.log(2037 - this.year);
		//solution 1
	// const self = this; // self of that
	// const isMillenial = function () {
	// 		console.log(self.year >= 1981 && self.year <= 1996);
	// 	};
	// 	isMillenial();
	// },

		// solution 2
	const isMillenial = () => {
			console.log(this.year >= 1981 && this.year <= 1996);
		};
		isMillenial();
	},

	
	greet: () => console.log(`Hey ${this.firstName}`),
};



jonas.greet();
jonas.calcAge(); 



// arguments keyword
const addExpr = function (a,b) {
	console.log(arguments);
	return a+b;
}

addExpr(2,5);
addExpr(2,5,6,9);

var addArrow = (a,b) => a+b;

*/

let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

const jessica = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27,
};

const marriedJessica = jessica; // we are just copying a reference which just points to the same object.

marriedJessica.lastName = "Davis";
console.log("Before marriage", jessica);
console.log("After marriage", marriedJessica);

//copying objects.
const jessica2 = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27,
	family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // properties are copied
jessicaCopy.lastName = "Davis";

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log("Before marriage", jessica2);
console.log("After marriage", jessicaCopy);




'use strict';
/*
// The call and apply Methods
const lufthansa = {
	airline: 'Lufthansa',
	iataCode: 'LH',
	bookings: [], // empty array
	// previously " book: function() {} " but this is simpler.
	book(flightNum, name) {
		console.log(
			`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
		);
		this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); // references LH123 and name from argument.
	},
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
	airline: 'Eurowings',
	iataCode: 'EW',
	bookings: [],
};

const book = lufthansa.book; // possible because of first-class functions. but book is no longer the method from the object. Instead it's a copy.

/*book(23, 'Sarah Williams' // ERROR: property airlilng of undefined. this.keyword depends on how the function is called.

// telling JS what this. should point to. CALL APPLY AND BIND METHODS

book.call(eurowings, 23, 'Samuel Marchant');
console.log(eurowings);

book.call(lufthansa, 23, 'Samuel Marchant');
console.log(lufthansa);

const swiss = {
	airline: 'Swiss Air Lines',
	iataCode: 'LX',
	bookings: [],
};
book.call(swiss, 583, 'Joe Mama');

// Apply Method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//simpler
book.call(swiss, ...flightData);

// BIND Method

//bind does not immediately call, creates new function where this keyword is bound. E.g. we need to use Eurowings for bookings all the time

//creating booking function for each of the airline (without having to call the function every time!)

const bookEW = book.bind(eurowings); // this = eurowings 4 airline and iatacode!
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Stevie Wonder'); // Stevie Wonder booked a seat on Eurowings flight EW23

// bind for 1 specific airline and flight number - Partial Application

const bookEW23 = book.bind(eurowings, 23); //Only for flight 23 so book(flightNum) is set
bookEW23('Cheng Lim'); // Cheng Lim booked a seat on Eurowings flight EW23
bookEW23('Martha Donna'); // Martha Donna booked a seat on Eurowings flight EW23

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
	// console.log(this);

	this.planes++;
	console.log(this.planes);
};
document
	.querySelector('.buy')
	.addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // higher order function which receives a callback function
// if we don't use bind, then the actual html class (buy) is used as the .this keyword instead of lufthansa.


//partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.10,200)); // = 220

const addVAT = addTax.bind(null, 0.23) //Portugal vat is 23%. null because we aren't changing any .this keyword. addVAT = value => value + value * 0.23;

console.log(addVAT(100)); // order of argument is important - 100 becomes value argument. = 123

// one function that can return a function that does addVAT.

const addTax = function (taxRate) {
	return function (value) {
		console.log(value + value * taxRate);
	};
};

const portugalTax = addTax(0.23); //Portugal's Tax of 23%
portugalTax(100); // 123 from value of 100 

const ukTax = addTax(0.46); // UK's Tax of 46%
ukTax(100); // 146 from value of 100

// Closures

const secureBooking = function () { // <f> global execution context
	let passengerCount = 0;

	return function () {
		passengerCount++;
		console.log(`${passengerCount} passengers`);
	};
};

const booker = secureBooking(); // passenger count = 0 + function. Booker is the child scope of the global scope.  

booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers this works because of closures.

// Any function alwasy has access to the variable function of the execution context in which the function was created.

// in Booker, this function was born in the excecution context of 'secure booking' (which was popped off the stack previously). But it will get access to this variable environment, which contains passenger count variable. This is how funciton is able to read and maniputlate passenger count variable. This conection is called CLOSURE.

console.dir(booker);


let f; // not defined in variable environment

const g = function () {
	const a = 23;
	f = function () {
		// accessed f from the global environment.
		console.log(a * 2);
	};
};

const h = function () {
	const b = 777;
	f = function () {
		console.log(b * 2);
	};
};

g(); // a = 23, f = a*2
f(); // f = 23*2 = 46
h(); // f was reassigned to = b*2
f(); // now can access b = 777 and gives b*2 = 1554.

// Example 2
const boardPassengers = function (n, wait) {
	const perGroup = n / 3;

	setTimeout(function () {
		console.log(`We are now boarding all ${n} passengers! 😳`);
		console.log(`There are 3 groups,each with ${perGroup} passengers`);
	}, wait * 1000); // function will occur after wait(time) * 1000ms

	console.log(`We'll Start Boarding in ${wait} seconds`);
};

boardPassengers(180,3); // immediately `We'll Start Boarding in w seconds shows`, but after 3 seconds timeout function executes.

*/

(function () {
	//IFFY
	const header = document.querySelector('h1');
	header.style.color = 'red';

	document.querySelector('body').addEventListener('click', function () {
	header.style.color = 'blue';
});
})();

// why does this work?
// by the time call back is activated, the IFFY is long gone. const header is gone right? The function is attached to the body element.
'use strict';
/* 
//!  In OOP they start with cap letter. Even array and map.
//!  () => won't work because of this keyword.

const Person = function (firstName, birthYear) {
  // ? Blueprint - instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// * we call constructor function with "new".
const jonas = new Person('Jonas', 1991); // ? forging the blueprint
console.log(jonas);

// ? 4 steps happen behind the constructor
// * 1. new empty object created.
// * 2. function is called, this = {   } (empty object)
// * 3. {} linked to prototype.
// * 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

//! Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // 46

//! Adding Static Method
Person.hey = function () {
  console.log('hey there 🥳');
  console.log(this); // constructor function
}; // only works with person.hey
Person.hey(); //hey there 🥳 - this is not inherited

////////////////////////////////////////////////////////////////////////
//! Prototypal Inheritance in built-in objects like arrays
console.log(jonas.__proto__); // Object { calcAge: calcAge(), … }
// * protoype of jonas, which has the prototype methods we made earlier like calcAge

console.log(jonas.__proto__.__proto__); // protoype of jonas' prototype
// * gives us protoype property of protoype
// * object prototype is top of the prototype chain

console.log(Person.prototype.constructor);
// * points back to Person f

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__); //Array []
// * full of methods like concat, map etc.
// * each array inherit methods from the ===prototype===

console.log(arr.__proto__.__proto__);
// * Object prototype - the prototype itself is an object.
////////////////////////////////////////////////////////////////////////
//! Creating unique set NOT recommended, future updates may break this.
Array.prototype.unique = function () {
  // ? new unique funciton in the prototype
  return [...new Set(this)]; // returns unique 'set' of numbers in array
};
console.log(arr.unique()); // Array(5) [ 3, 6, 4, 5, 9 ]

const h1 = document.querySelector('h1'); //
// * <prototype>: HTMLHeadingElementPrototype, which has different methods

console.dir(x => x + 1);
// * has the funcitons prototype, which has different methods commonly used
////////////////////////////////////////////////////////////////////////
// ! Coding Challenge

//? 1 construction to implement a car for
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

//? 2 accelerate method to implement to car as new prototype
Car.prototype.calcAcceleration = function () {
  this.speed += 10;
  console.log(`${this.make}'s going to accelerate to ${this.speed}km/h`);
};

//? 3 break method decreasing speed by 5
Car.prototype.calcBreak = function () {
  this.speed -= 5;
  console.log(`${this.make}'s break decrease the speed to ${this.speed}km/h`);
};

//? 4 car objects and experiments (inheritance) calling accelerate and break

const bmw = new Car('BMW', 120);
bmw.calcAcceleration();
bmw.calcAcceleration();
bmw.calcAcceleration();
bmw.calcBreak();
bmw.calcBreak();

const mercedes = new Car('Mercedes', 95);
mercedes.calcAcceleration();
mercedes.calcBreak();
mercedes.calcBreak();
mercedes.calcBreak();
mercedes.calcAcceleration();

////////////////////////////////////////////////////////////////////////
// ! ES6 Classes

// ? class expression
// const PersonCl = class {}; // special type of func

// ? class declaration
class PersonCl {
  // new constructor
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // ? adding methods ES6 method, prototypal inheritance
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}!`);
  }

  get age() {
    return 2037 - this.birthYear; // getter for calcAge
  } // we will be able to read age of object - jessica.age // 41

  // ? Setter for full name - and for a property that already exists (fullName)
  set fullName(name) {
    console.log(name);
    if (name.includes(' '))
      this._fullName = name; // * convention for naming conflict
    else alert(`${name} not a full name!`);
  }
  // ? Getter for _fullName
  get fullName() {
    return this._fullName; // * convention for solving jessiaca.fullName issue
  }

  static hey() {
    console.log('hey there 🥳 inside ES6');
  }
}

const jessica = new PersonCl('Jessica Davies', 1996); // new keyword is important
console.log(jessica); // Object { firstName: "Jessica", birthYear: 1996 }
// jessica.calcAge(); // 2037-1996 = 41
// jessica.greet(); // Hey Jessica!

// ! notes
//*  1. classes are not hoised,i.e. can't use before they are declare

//*  2. classes are first class citizens, we can pass into functions and return them from f

//*  3. classes executed in strict mode! 'use strict';

//? need to understand prototypal inheitance , see notes 1-3
////////////////////////////////////////////////////////////////////////
//! Setter & Getter a value

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    // binds object propoery to a function (like a method)
    // function that will be called when property looked up
    return this.movements.slice(-1).pop(); // pop last value
  },

  set latest(mov) {
    // like a property
    this.movements.push(mov); // pu
  },
};
console.log(account.latest);

account.latest = 50; // setting the property
console.log(account.movements);

// * setters are useful for checking variation in arguments i.e. if it was Jessica Davis
// * however with _fullName, jessica.fullName won't work, therefore we need a getter to return _fullName
////////////////////////////////////////////////////////////////////////
//! Object.Create
// creating object literal for prototype
const personProto = {
  // ? here we choose the method we want the 'person' object to inherit
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName; // similar to constructor function
    this.birthYear = birthYear; // but this has nothing to do with the constructor
  },
};

const steven = Object.create(personProto); //steven object links to personProto prototype
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // 35

const sarah = Object.create(personProto);
sarah.init('Sarah', 1979); // initialising the object.
sarah.calcAge(); // 58
////////////////////////////////////////////////////////////////////////

//! Coding Challenge #2

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  calcAcceleration() {
    this.speed += 10;
    console.log(`${this.make}'s going to accelerate to ${this.speed}km/h`);
  }
  calcBreak() {
    this.speed -= 5;
    console.log(`${this.make}'s break decrease the speed to ${this.speed}km/h`);
  }

  get speedUS() {
    // binds object propoery to a function (like a method)
    // function that will be called when property looked up
    return this.speed / 1.6; // pop last value
  }

  // set always take 1 argument
  set speedUS(speed) {
    this.speed = speed * 1.6;
  } // so if ford.speedUS is 50, then ford.speed will be 80
}

const ford = new CarCl('Ford', 120);

ford.calcAcceleration();

//! Inheritance Between "Classes": Constructor Functions
// person constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// student constructor function with additional property
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // ? solution for using previous constructor
  this.course = course;
};

// * Object.create & adding methods
Student.prototype = Object.create(Person.prototype); // created manually

Student.prototype.introduce = function () {
  console.log(
    `Hi, my name is ${this.firstName} and I study ${this.course}! 😂`
  );
};
Student.prototype.constructor = Student; // Changing constructor to student

const mike = new Student('Mike', 2020, 'CompSci');
mike.introduce(); // Hi, my name is Mike and I study CompSci! 😂
mike.calcAge(); // 17
*/

////////////////////////////////////////////////////////////////////////

//! Coding Challenge #3
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀


const Car = function (make, speed) {
  // Car constructor
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  // Car constructor function
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.break = function () {
  // Car constructor function
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const Electric = function (make, speed, charge) {
  // Electric constructor
  Car.call(this, make, speed);
  this.charge = charge;
};

Electric.prototype = Object.create(Car.prototype); // ? linking constructor to Cars constructor
Electric.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

Electric.prototype.accelerate = function () {
  // overides car.accelerate(); because it is first in the prototype chain
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new Electric('Tesla', 120, 23);
tesla.chargeBattery(90); // charge will now be 90
tesla.break(); // Tesla is going at 115 km/h
tesla.accelerate(); // Tesla going at 135 km/h, with a charge of 89%
////////////////////////////////////////////////////////////////

//! inheritance in ES6 classes, extends cl and super

class SchoolCl {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  calcAge() {
    console.log(`${this.name} was born in ${this.age}`);
  }
}

//?  linking prototype ES6
class StudentCl extends SchoolCl {
  constructor(fullName, birthYear, course) {
    // super always happens first
    super(fullName, birthYear); // call constructor function of the parent function
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new StudentCl('Martha jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// ! object.create() for class inheritance
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto); // StudentProto is parent prototype of jay
jay.init('Jay', 2010, 'Computer Science'); //Object { firstName: "Jay", birthYear: 2010, course: "Computer Science" }
jay.introduce(); // My name is Jay and I study Computer Science
jay.calcAge(); // 27

// Public fields
// Private fields
// Public methods
// Private methods

class Account {
  //? Public Fields (instances) not on the prototype
  locale = navigator.languaguge; // public field - no const or let

  //? Private Fields not accessible from the outside
  #movements = [];
  #pin; // empty variable (undefined)
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // redefining value, private field
    // this._movements = []; // creating property not based on any input
    this.locale = navigator.language;
    console.log(`Thanks for opening this account ${owner}!`);
  }

  // Public Methods below (API)
  getMovements() {
    return this.#movements;
  }
  deposit(amount) {
    this.#movements.push(amount); // pushes new value into the movements array
    return this;
  }

  withdraw(amount) {
    this.deposit(-amount); // calling other method since this works the same way
    return this;
  }

  requestLoan(amount) {
    if (this.#approveLoan(amount)) {
      this.deposit(amount);
      console.log(`Loan of ${amount} approved!`);
    }
    return this;
  }

  // Private methods  // Hidden API
  #approveLoan(amount) {
    return true;
  }
}

const account1 = new Account('Cheng', 'GBP', 6999);
account1.deposit(250);
account1.withdraw(150);
console.log(account1); // These methods are the interface (API) to our object!
console.log(account1.pin); //*  pin accessable which is bad OpSec, we need data encapsulation.
console.log(account1.getMovements()); //Array [ 250, -150 ]
// console.log(account1.#approveLoan(200));

// Chaining
account1
  .deposit(300)
  .deposit(500)
  .withdraw(35)
  .requestLoan(25000)
  .withdraw(4000);
*/

// Coding Chalenge #4 ES6

class EVCl {
  #charge;
  constructor(make, speed, charge) {
    this.make = make;
    this.speed = speed;
    this.charge = charge;
  }

  break() {
    // Car constructor function
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this; // used on methods that set something
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian
  .accelerate()
  .chargeBattery(90)
  .break()
  .break()
  .break()
  .accelerate()
  .accelerate()
  .accelerate();

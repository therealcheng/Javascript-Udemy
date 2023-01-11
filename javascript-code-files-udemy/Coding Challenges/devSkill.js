// Challenge #1
const thermometer1 = [17, 21, 23];
const thermometer2 = [12, 5, -5, 0, 4];

const printForecast = (arr) => {
  let day = 1;
  arr.forEach((element) => {
    console.log(`${element}ºC in ${day} days`);
    day += 1;
  });
};

printForecast(thermometer1);
printForecast(thermometer2);

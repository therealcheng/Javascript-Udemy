'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
};

// ! Get countries json
const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
    return response.json();
  });
};

const renderCountry = function (data, className = '') {
  const html = `
        <article class="${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)} Million People</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data.languages)[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(Object.entries(data.currencies)[0][1])[0][1]
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not Found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      if (!neighbour) throw new Error('No neighbour found :(');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(errorMsg => {
      renderError(`Something went wrong. ${errorMsg} Try Again 🌍`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async country => {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    //Reverse Geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=474868965963004875976x17585`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data :(!');
    const dataGeo = await resGeo.json();
    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country D:!');
    const data = await res.json();
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log(`${err}`);
    renderError(`Something went wrong 😮 "${err.message}"`);

    // Reject Promise returned froma async function
    throw err;
  }
};

// console.log(`1: will get location`);
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.log(`2: ${err.message}`);
//   }
// })();
// console.log(`3: Finished getting location`);

const get3Countries = async (c1, c2, c3) => {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital)); // new array of just the city.
  } catch (err) {
    console.log(err.message);
  }
};

// get3Countries('portugal', 'united kingdom', 'america');

// (async () => {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/canada`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     // winning promise comes out, whichever call succeeds first
//   ]);
//   console.log(res[0]);
// })();

// timeout func if reject is too long
const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long!!!! :('));
    }, sec * 1000);
  });
};

// promise race between the request and timeout!
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/canada`),
  timeout(10),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

// Promise.allSettled([
//   Promise.resolve('success!'),
//   Promise.reject('error D: !'),
//   Promise.resolve('another success!'),
// ]).then(res => console.log(res));

Promise.any([
  Promise.resolve('success!'),
  Promise.reject('error D: !'),
  Promise.resolve('another success!'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

//DOM select image container
const imgContainer = document.querySelector('.images');

const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = new Image(); // img = document.createElement('img');
    img.src = imgPath; // set src to argument path

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('image not found'));
    });
  });
};

const loadNPause = async () => {
  try {
    //load img 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 is loaded.');
    await wait(2);
    img.style.display = 'none';

    //load img 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 is loaded.');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};
loadNPause();

// Promisifying set timeout function
const wait = seconds => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
};

// part 2
const loadAll = async imgArr => {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs); // retuns 3 promises

    const imgsEl = await Promise.all(imgs); // combinator function
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('Parrallel'));
  } catch (error) {
    console.error(error);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// btn.addEventListener('click', () => getCountryData('United Kingdom'));
// //Coding Challenge #1
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=474868965963004875976x17585`
//   )
//     .then(response => {
//       return response.json(); // when promise is fulfilled
//       if (!response.ok)
//         // when promise is rejected
//         throw new Error(`Problem with geocoding ${response.status}`);
//     })
//     .then(data => {
//       // console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(errorMsg =>
//       console.error(`Something went wrong (${errorMsg}) please try again!`)
//     )
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/*
// Promises
const lotteryPromise = new Promise((resolve, reject) => {
  console.log('lottery draw is happening...');
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve("you've won the lottery!");
    else reject(new Error("you've lost your money!"));
  }, 2000);
});

lotteryPromise
  .then(result => console.log(result))
  .catch(err => console.log(err));

// Promisifying set timeout.
const wait = seconds => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 1 second');
  });

///////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest(); // old school AJAX call,
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // request.open get data, cross origin recessing // enpoint url - for api call

  request.send(); // fetch data in background, async non blocking behavior
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `    
<article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(2)} Million People</p>
    <p class="country__row"><span>🗣️</span>${
      Object.entries(data.languages)[0][1]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.entries(Object.entries(data.currencies)[0][1])[0][1]
    }</p>
  </div>
</article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  }); // response text will show when data has responded.
};

getCountryData('peru');
getCountryData('portugal');

////////////////////////////////////////////////////////////////////////////////////////////////

const getCountryAndNeighbour = function (country) {
  // Ajax Call country 1
  const request = new XMLHttpRequest(); // old school AJAX call,
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // request.open get data, cross origin recessing // enpoint url - for api call
  request.send(); // fetch data in background, async non blocking behavior
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    // Render Country 1
    renderCountry(data);

    // Get neighbouring country 2 from country 1
    const neighbour = data.borders?.[0];

    if (!neighbour) return; // guard clause

    // Ajax call neighbour country
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // Nested Callbacks - callback hell
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour'); // class for labelling neighbour
    });
  });
};

getCountryAndNeighbour('united kingdom');
*/

// const whereAmI = function () { // OLD
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=474868965963004875976x17585`
//       );
//     })
//     .then(response => {
//       return response.json(); // when promise is fulfilled
//       if (!response.ok)
//         // when promise is rejected
//         throw new Error(`Problem with geocoding ${response.status}`);
//     })
//     .then(data => {
//       // console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(errorMsg =>
//       console.error(`Something went wrong (${errorMsg}) please try again!`)
//     )
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', whereAmI);

// // Coding Challenge #2

// //DOM select image container
// const imgContainer = document.querySelector('.images');

// // Create new image promise
// const createimage = imgPath => {
//   return new Promise((resolve, reject) => {
//     const img = new Image(); // img = document.createElement('img');
//     img.src = imgPath; // set src to argument path

//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', () => {
//       reject(new Error('image not found'));
//     });
//   });
// };

// // Promisifying set timeout function
// const wait = seconds => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // Defining global variable for image before storing it inside promise
// let currentImage;
// createimage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('IMAGE IS configured.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none'; // hides
//     return createimage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('IMAGE IS configured.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none'; // hides
//   })
//   .catch(err => console.error(err));

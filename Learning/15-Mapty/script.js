'use strict';

class Workout {
  // Parent class of running and cycling
  date = new Date();
  id = (Date.now() + '').slice(-10); // id = "0166326670" created by running current date ana time
  constructor(coords, distance, duration) {
    this.coords = coords; // [ lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  // a '_' is a private field or method

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // 0-11

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`; // Type(Running/Cycling) on August 10
  }
}

class Running extends Workout {
  //child
  type = 'running'; // identifier for html className
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration); // inherit
    this.cadence = cadence; // new value
    this.type = 'running';
    this.calcPace(); // runs when we add a new workout (form)
    this._setDescription(); // from parent function
  }

  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  //child
  type = 'cycling'; // identifier for html className
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration); // inherited
    this.elevationGain = elevationGain; // new value
    this.calcSpeed(); // uns when we add a new workout (form)
    this._setDescription(); // from parent function
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
// test
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Running([39, -12], 27, 95, 523);
// console.log(Workout.id);

// ? APPLICATION ARCHITECTURE
// DOM manipulation
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // # hidden
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  constructor() {
    // Get user position
    this._getPosition(); // position of app after initilisation - from parent class
    // we can do this here because when a new object is called the constructer is also called after

    // Get local storage
    this._getLocalStorage(); // local storage

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this)); // event listener for entering the form, bind function in app
    inputType.addEventListener('change', this._toggleElevationField); // event listener for toggle running/cycling form.
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      // Geolocation API -  if location access = true, give success and error callback functions
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // gets current position from _loadMap function
        function () {
          alert('Geolocation failed'); // alert the error message if no location access
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords; // get latitude
    const { longitude } = position.coords; // get longitude
    const coords = [latitude, longitude]; // coord array of latitude and longitude

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // define map as map view at coords with distance of 13

    // Map layer from leaflet
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling Clicks on map layer
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    }); // rendering the work map marker
  }

  _showForm(mapE) {
    this.#mapEvent = mapE; // copy mapE to global variable mapEvent so we can pass it (lat and long of click) later
    form.classList.remove('hidden'); // remove hidden class on input form
    inputDistance.focus(); // instantly focus the input distance tab
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ''; // value of inputs are blank
    form.style.display = 'none'; // removes display first preventing animation bug.
    form.classList.add('hidden'); // remove hidden class on input
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // loop check if num is finite or not
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const isPositiveInteger = (...inputs) => inputs.every(input => input > 0);
    e.preventDefault();

    // * Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng; // leaflet mapEvent from global variable. latlng shows lat and long coord.
    let workout;

    // * If workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !isPositiveInteger(distance, duration, cadence)
      )
        return alert('Invalid - have to be positive number!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // * If workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !isPositiveInteger(distance, duration)
      )
        return alert('Invalid - have to be positive number!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // * Delegation
    // * Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout); // check if new object works

    // * Render workout on map as markers
    this._renderWorkoutMarker(workout); // calling method of the 'this' keyword so no bind, not callback of a callback

    // * Render workout on list (side)
    this._renderWorkout(workout);

    // * Hide and Clear input fields
    this._hideForm();

    // * Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords) // sets let and long market position, need to tell where to display marker
      .addTo(this.#map) // adds marker
      .bindPopup(
        //binds popup to a layer and returns the str/html
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`, // class // https://leafletjs.com/reference.html
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">'${workout.description}'</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;
    if (workout.type === 'running')
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    if (workout.type === 'cycling')
      html += `
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
        </div>
     </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEL = e.target.closest('.workout'); // workout element html
    // console.log(workoutEL); // Check   // helps to build a bridge between ui and data(id)

    if (!workoutEL) return; // guard clause

    const workout = this.#workouts.find(
      work => work.id === workoutEL.dataset.id
    ); // dataset because id defined using 'data'.

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    }); //Sets the view of the map (geographical center and zoom) with the given animation options.
  }

  // Accessing local storage and loadingError
  // problem because objects from local storage won't inherit from the prototype
  _setLocalStorage() {
    // local storage has blocking so don't use localStorage for large amounts of data
    // key value store(key, value Str))
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // convert any object to string
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data); // logs when workout is made and data is saved

    if (!data) return;

    this.#workouts = data; // executes in the beginning where we haven't added any data, so the previous workouts are restored
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    }); // rendering sidebar
  }

  reset() {
    localStorage.removeItem('workouts'); // removes workouts in local storage.
    location.reload(); // reloads the page and location.
  }
}

const app = new App(); // object for app

const newFeature = function () {
  return 20 * 20;
};

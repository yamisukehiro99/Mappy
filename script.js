'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  id = (Date.now() + ''). slice(-10);
  date = new Date();
  
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace()
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
  }

  calcSpeed() {
    this.speed = this.distance / this.duration / 60;
    return this.speed;
  }
}
const run1 = new Running([39, -12], 5.2, 24, 178)
const cyc1 = new Cycling([39, -12], 27, 95, 523)

console.log(run1);
console.log(cyc1);
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    //events
    form.addEventListener('submit', this._newWorkout.bind(this));
    //toggling
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
  }

  //Methods
  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
      alert('Could not get your position')
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    );
  }
  _loadMap(position) {
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    const coords = [latitude, longitude]
    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    L.marker(coords).addTo(this.#map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
    this.#map.on('click', this._showForm.bind(this))
  }
  _showForm(mapE) {
    this.#mapEvent = mapE
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    e.preventDefault();
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""
    const {lat, lng} = this.#mapEvent.latlng
    const markerCoords = [lat, lng];
    L.marker(markerCoords).addTo(this.#map).bindPopup(L.popup({maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup',}).setContent('Workout')).openPopup(); 
  }
}



const app = new App();


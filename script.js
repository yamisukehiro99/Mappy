'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  constructor() {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ""
      const {lat, lng} = mapEvent.latlng
      const markerCoords = [lat, lng];
      L.marker(markerCoords).addTo(map).bindPopup(L.popup({maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup',}).setContent('Workout')).openPopup();
      // form.classList.add('hidden');
    })
    
    inputType.addEventListener('change', function(e) {
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    })
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._loadMap, function() {
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
    const url = `https://www.google.com/maps/@${latitude},${longitude}z`;
    const coords = [latitude, longitude]
      map = L.map('map').setView(coords, 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    L.marker(coords).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
  
    map.on('click', function(e) {
      mapEvent = e
      form.classList.remove('hidden');
      inputDistance.focus();
    })
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

const app = new App();
app._getPosition(); 
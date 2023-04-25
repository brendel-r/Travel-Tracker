import { fetchAllData, addTripToDataBase } from '../src/apiCalls';
import './css/styles.css';
import './images/travel-wizard.png';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';
import dayjs from 'dayjs';



// Query Selectors
const welcomeUserDisplay = document.getElementById('welcome-user'),
  totalSpentDisplay = document.getElementById('total-spent'),
  upcomingTripsDisplay = document.getElementById('upcoming-trips'),
  pastTripsDisplay = document.getElementById('past-trips'),
  destinationSelector = document.querySelector('.destPicker'),
  addTripForm = document.getElementById('addTripForm'),
  dashboard = document.getElementById('dashboard'),
  bookTripButton = document.querySelector('.bookTrip'),
  confirmTripForm = document.getElementById('confirmTripForm'),
  loginErrorMessage = document.getElementById('loginError'),
  tripErrorMessage = document.getElementById('tripErrorMessage');

const formatToCurrency = (amount) => {
  return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const formatCost = (num) => {
  num = Math.round(num, 2);
  return formatToCurrency(num)
};

// controls componets
//keeps from refreshing page
const backToDashboard = () => {
  dashboard.style.visibility = "visible";

  addTripForm.style.visibility = "hidden";
  confirmTripForm.style.visibility = "hidden";
  document.forms.loginForm.style.visibility = "hidden";
  loginErrorMessage.style.visibility = "hidden";
  tripErrorMessage.style.visibility = "hidden";
};

//add trip if user has submitted all data
const addTrip = () => {
  const form = document.forms.addTripForm;
  //verifys form is filled out and
  var data = new FormData(form);
  for (var [key, value] of data) {
    if (value === "") {
      tripErrorMessage.style.visibility = "visible"
      return
    }
  }
  form.style.visibility = "hidden";
  // gets estimated cost for confirmation dialog
  const estimatedCost = Trip.getProposedTripCost(+form.destID.value, +form.numTravelers.value, +form.days.value)
  document.getElementById("reportEstimatedCost").innerText = formatCost(estimatedCost);
  tripErrorMessage.style.visibility = "hidden";
  confirmTripForm.style.visibility = "visible";
};

//handles trip confirmation
const tripConfirmedHandler = () => {
  //adds trip instance 
  const [tripInstance, tripData] = Trip.addATrip({
    "userID": +addTripForm.loginID.value,
    "destinationID": +addTripForm.destID.value,
    "travelers": +addTripForm.numTravelers.value,
    "date": addTripForm.date.value,
    "duration": +addTripForm.days.value,
    "status": "pending", // new trips are always in pending status
    "suggestedActivities": []
  })
  //formats date
  tripData.date = tripData.date.replaceAll('-', '/')
  //adds trip via api to database
  addTripToDataBase(tripData);
  //creates card for display in dashboard
  createTripCard(tripInstance, upcomingTripsDisplay);
  backToDashboard();
};

//verify login data fields
const verifyLogin = () => {
  const form = document.forms.loginForm;
  const userName = form.user.value;
  const password = form.passwd.value;

  //check if password is correct
  if (password !== 'travel') {
    loginErrorMessage.style.visibility = 'visible'
    return
  };

  //verifys format of user name includes numbers after 8 characters
  if (userName.match(/^traveler\d+$/)) {
    const travelerUserID = +userName.slice(8);
    //gets user instance from travelers from userID
    const traveler = Traveler.getTravelerByUserID(travelerUserID);
    if (traveler !== undefined) {
      // if its a valid traveler then the following happens
      drivePage(traveler);
      backToDashboard();
      return;
    };
  };
  loginErrorMessage.style.visibility = 'visible';
};

const hideErrorMessage = () => loginErrorMessage.style.visibility = "hidden";

document.querySelector('.submitButton').onclick = addTrip;
document.querySelector('.cancelButton').onclick = backToDashboard;
document.querySelector('.yesButton').onclick = tripConfirmedHandler;
document.querySelector('.noButton').onclick = backToDashboard;
document.querySelector('.loginButton').onclick = verifyLogin;
document.querySelectorAll('#loginForm input')
  .forEach((elem) => elem.onclick = hideErrorMessage);

  bookTripButton.onclick = () => {
  addTripForm.style.visibility = "visible";
  dashboard.style.visibility = "hidden";
};

//displaying a trip on dashboard
const createTripCard = (trip, targetDisplay) => {
  const destination = Destination.getDestinationByID(trip.getDestinationID());

  const destinationName = destination.getDestination();
  const image = destination.getImage();
  const alt = destination.getAlt();

  const tripDate = dayjs(trip.getDate()).format('ddd, MM/DD/YYYY');
  const duration = trip.getDuration();
  const travelerCount = trip.getTravelers();

  const html = `<div class="tripCard">
    <div class="cardRow">
      <img class="tripImage" width='180px' src=${image} alt=${alt}>
    </div>
    <div class="cardRowInfo">
    <h3>${destinationName}</h3>
    <p>Your trip start date is ${tripDate}.</p>
    <p>Your trip duration is ${duration} days.</p>
    <p>${travelerCount} traveler(s).</p>  
    </div>
  </div>`
  targetDisplay.innerHTML += html;
};

//this fills in componets on the dashboard after login
const drivePage = (loginTraveler) => {
  welcomeUserDisplay.innerText = `Welcome, ${loginTraveler.getName()}!`;
  totalSpentDisplay.innerText = formatCost(loginTraveler.getTotalCost());
  const loginUserID = loginTraveler.getID();
  document.getElementById('loginID').value = loginUserID;
  const travelerTrips = Trip.getTravelerTrips(loginUserID);
//displays pending trips
  travelerTrips.filter(
    (trip) => trip.isPending()
  )
    .forEach(trip => createTripCard(trip, upcomingTripsDisplay))
// displays approved trips
  travelerTrips.filter(
    (trip) => !trip.isPending()
  )
    .forEach(trip => createTripCard(trip, pastTripsDisplay))
// adding options to destination selector (drop down)
  Destination.allDestinations.forEach(destination => {
    const option = document.createElement('option');
    option.value = destination.getID();
    option.innerText = destination.getDestination();
    destinationSelector.appendChild(option)
  });
};

// at start get all existing trips,destination, and travelers
//add to the corresponding classes as instances
let fetches = fetchAllData();
fetches.then(([travelerData, tripData, destinationData]) => {
  // initalize travelers, trips, and destinations
  tripData.trips.forEach(aTrip =>
    new Trip(aTrip))

  travelerData.travelers.forEach(aTraveler => {
    new Traveler(aTraveler)
  });

  //sorts destinations before creating instances, so that
  //they appear in alphabetical order in dropdown
  destinationData.destinations.sort((a, b) => {
    return a.destination.localeCompare(b.destination)
  })
  destinationData.destinations.forEach(aDestination =>
    new Destination(aDestination))
});


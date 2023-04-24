import { fetchAllData } from '../src/apiCalls';
import './css/styles.css';
import './images/travel-wizard.png'
import Traveler from './Traveler'
import Destination from './Destination'
import Trip from './Trip'
import dayjs from 'dayjs'


// Query Selectors
const welcomeUserDisplay = document.getElementById('welcome-user'),
  totalSpentDisplay = document.getElementById('total-spent'),
  upcomingTripsDisplay = document.getElementById('upcoming-trips'),
  pastTripsDisplay = document.getElementById('past-trips'),
  destinationSelector = document.querySelector('.destPicker'),
  addTripForm = document.getElementById('addTripForm'),
  dashboard = document.getElementById('dashboard'),
  bookTripButton = document.querySelector('.bookTrip');



const addTrip = () => {
  const form = document.forms.addTripForm;
  // console.log(form.date.value)
  // console.log(form.numTravelers.value)
  // console.log(form.days.value)
  // console.log(form.destID.value)
  // console.log('login', form.loginID.value)
  
  //new trip instance to class Trip with unused ID
  const trip = Trip.addATrip({
    "userID": +form.loginID.value,
    "destinationID": +form.destID.value,
    "travelers": +form.numTravelers.value,
    "date": form.date.value,
    "duration": +form.days.value,
    "status": "pending",
    "suggestedActivities": []
  })
  createTripCard(trip, upcomingTripsDisplay);
  addTripForm.style.visibility = "hidden";
  dashboard.style.visibility= "visible";
  
  
  var x = Trip.getProposedTripCost(+form.destID.value, +form.numTravelers.value, +form.days.value )
 console.log(x)
  // 2. post the trip to the backend
  // 0.  approve trip yes/no
}

document.querySelector('.submitButton').onclick=addTrip;
bookTripButton.onclick = () => {
  addTripForm.style.visibility = "visible";
  dashboard.style.visibility= "hidden";
};
const formatToCurrency = (amount) => {
  return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
const formatCost = (num) => {
  num = Math.round(num, 2);
  return formatToCurrency(num)
}
const createTripCard = (trip, targetDisplay) => {
  const destination = Destination.getDestinationByID(trip.getDestinationID())

  const destinationName = destination.getDestination();
  const image = destination.getImage();
  const alt = destination.getAlt();

  const tripDate = dayjs(trip.getDate()).format('ddd - MM/DD/YYYY');
  const duration = trip.getDuration();
  const travelerCount = trip.getTravelers();

  const html = `<div class="tripCard">
    <div class="cardRow">
      <img class="tripImage" width='180px' src=${image} alt=${alt}>
    </div>
    <div class="cardRowInfo">
    <h3>${destinationName}</h3>
    <p>Your trip started on ${tripDate}.</p>
    <p>Your trip lasted ${duration} days.</p>
    <p>You had ${travelerCount} traveler(s).</p>  
    </div>
  </div>`
  targetDisplay.innerHTML += html;
}

const drivePage = (loginTraveler) => {
  welcomeUserDisplay.innerText = `Welcome, ${loginTraveler.getName()}!`;
  totalSpentDisplay.innerText = formatCost(loginTraveler.getTotalCost());
  const loginUserID = loginTraveler.getID();
  document.getElementById('loginID').value = loginUserID;
  const travelerTrips = Trip.getTravelerTrips(loginUserID);
  travelerTrips.filter(
    (trip) => trip.isPending()
  )
    .forEach(trip => createTripCard(trip, upcomingTripsDisplay))

    travelerTrips.filter(
      (trip) => !trip.isPending()
    )
      .forEach(trip => createTripCard(trip, pastTripsDisplay))

  Destination.allDestinations.forEach(destination => {
    const option = document.createElement('option');
    option.value = destination.getID();
    option.innerText = destination.getDestination();
    destinationSelector.appendChild(option)
  })
}


let fetches = fetchAllData();
fetches.then(([travelerData, tripData, destinationData]) => {
  // initalize travelers, trips, and destinations
  tripData.trips.forEach(aTrip =>
    new Trip(aTrip))

  travelerData.travelers.forEach(aTraveler => {
    new Traveler(aTraveler)
  })

  destinationData.destinations.sort((a, b) => {
    return a.destination.localeCompare(b.destination)
  })
  destinationData.destinations.forEach(aDestination =>
    new Destination(aDestination))

  // drivePage(Traveler.getRandomTraveler())
  drivePage(Traveler.getTravelerByID(38))
})



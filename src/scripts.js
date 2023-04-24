import { fetchAllData, addTripToDataBase } from '../src/apiCalls';
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
  bookTripButton = document.querySelector('.bookTrip'),
  confirmTripForm = document.getElementById('confirmTripForm')
  ;

const backToDashboard = () => {
  addTripForm.style.visibility = "hidden";
  dashboard.style.visibility= "visible";
  confirmTripForm.style.visibility= "hidden";
}

const addTrip = () => {
  const form = document.forms.addTripForm;
  form.style.visibility= "hidden";
  const estimatedCost = Trip.getProposedTripCost(+form.destID.value, +form.numTravelers.value, +form.days.value)
  document.getElementById("reportEstimatedCost").innerText = formatCost(estimatedCost);
  confirmTripForm.style.visibility= "visible";
  // console.log(form.date.value)
  // console.log(form.numTravelers.value)
  // console.log(form.days.value)
  // console.log(form.destID.value)
  // console.log('login', form.loginID.value)
}

const tripConfirmedHandler = () => {
  const [tripInstance, tripData] = Trip.addATrip({
    "userID": +addTripForm.loginID.value,
    "destinationID": +addTripForm.destID.value,
    "travelers": +addTripForm.numTravelers.value,
    "date": addTripForm.date.value,
    "duration": +addTripForm.days.value,
    "status": "pending", // new trips are always in pending status
    "suggestedActivities": []
  })
  addTripToDataBase(tripData);
  createTripCard(tripInstance, upcomingTripsDisplay);
  // 2. post the trip to the backend
  backToDashboard();

  var x = Trip.getProposedTripCost(+form.destID.value, +form.numTravelers.value, +form.days.value )
 console.log(x)
}

document.querySelector('.submitButton').onclick=addTrip;
document.querySelector('.cancelButton').onclick=backToDashboard;
document.querySelector('.yesButton').onclick=tripConfirmedHandler;
document.querySelector('.noButton').onclick=backToDashboard;
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



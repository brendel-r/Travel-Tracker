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
  pastTripsDisplay = document.getElementById('past-trips');


//
function formatToCurrency(amount) {
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

  const tripDate = dayjs(trip.getDate()).format('ddd, DD MMM YYYY');
  const duration = trip.getDuration();
  const travelerCount = trip.getTravelers();

  const html = `<div class="tripCard">
  <div class="cardRow">
  <img class="tripImage" width='180px' src=${image} alt=${alt}>
  <h3>${destinationName}</h3>
  </div>
  <p>Your trip started on ${tripDate} / Your trip lasted ${duration} days.</p>
  <p>You had ${travelerCount} traveler(s).</p>  
</div>`
  targetDisplay.innerHTML += html;
}
const drivePage = (loginTraveler) => {
  welcomeUserDisplay.innerText = `Welcome ${loginTraveler.getName()}!`;
  totalSpentDisplay.innerText = formatCost(loginTraveler.getTotalCost());

  const travelerTrips = Trip.getTravelerTrips(loginTraveler.getID());
  travelerTrips.filter(
    (trip) => trip.isPending()
  )
    .forEach(trip => createTripCard(trip, upcomingTripsDisplay))

    travelerTrips.filter(
      (trip) => !trip.isPending()
    )
      .forEach(trip => createTripCard(trip, pastTripsDisplay))
  

}


let fetches = fetchAllData();
fetches.then(([travelerData, tripData, destinationData]) => {
  // initalize travelers, trips, and destinations
  tripData.trips.forEach(aTrip =>
    new Trip(aTrip))

  travelerData.travelers.forEach(aTraveler => {
    new Traveler(aTraveler)
  })



  destinationData.destinations.forEach(aDestination =>
    new Destination(aDestination))

  // drivePage(Traveler.getRandomTraveler())
  drivePage(Traveler.getTravelerByID(38))
})



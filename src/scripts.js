import { fetchAllData } from '../src/apiCalls';
import './css/styles.css';
import './images/travel-wizard.png'
import Traveler from './Traveler'
import Destination from './Destination'
import Trip from './Trip'
// import dayjs from 'dayjs'


// Query Selectors
const welcomeUserDisplay = document.getElementById('welcome-user'),
  totalSpentDisplay = document.getElementById('total-spent'),
  upcomingTripsDisplay = document.getElementById('upcoming-trips'),
  pastTripsDisplay = document.getElementById('past-trips');



let fetches = fetchAllData();
fetches.then(([travelerData, tripData, destinationData]) => {
  tripData.trips.forEach(aTrip =>
    new Trip(aTrip))
  travelerData.travelers.forEach(aTraveler => {
    new Traveler(aTraveler)
  })

  destinationData.destinations.forEach(aDestination =>
    new Destination(aDestination))
})


import dayjs from 'dayjs';
import Destination from './Destination';

class Trip {
  static allTrips = [];
  constructor({ id, userID, destinationID, travelers, date, duration, status }) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = status;

    Trip.allTrips.push(this);
  };

  //getters
  getID() {
    return this.id;
  };

  //returns static array for the Trip class
  getAllTrips() {
    return Trip.allTrips;
  };

  getDestinationID() {
    return this.destinationID;
  };

  getTravelers() {
    return this.travelers;
  };

  getDuration() {
    return this.duration;
  };

  getDate() {
    return this.date;
  }

  getUserID() {
    return this.userID;
  };

  //boolean for approved status
  isApproved() {
    return this.status === 'approved';
  };

   //boolean for pending status
  isPending() {
    return this.status === 'pending';
  };

  
  
  //calculates single trip cost and adds 10%
  getSingleTripCost() {
    //sets up vairables to use in the static calcTripCost function
    const dest = Destination.getDestinationByID(this.getDestinationID());
    const travelerCount = this.getTravelers();
    const duration = this.getDuration();

    return Trip.calcTripCost(dest, travelerCount, duration);
  };

  static addATrip(tripData) {
    // finds the largest id among all trips, add 1, 
    //then add as property to tripData
    // adds id to new trip 1 more than max id found
    tripData.id = Trip.allTrips.reduce((acc, currentTrip) => {
      if (acc < currentTrip.getID()) {
        acc = currentTrip.getID();
      }
      return acc
    }, -1) + 1;
    //returns array of new instance and the trip data used to create it
    return [new Trip(tripData), tripData]
  }

//gets all trips for given user
  static getTravelerTrips(userID) {
    const results = Trip.allTrips.filter(trip => trip.getUserID() === userID)
    results.forEach(trip => {
      //assigns the upcoming attribute if it is not already assigned
      if (this?.upcoming === undefined) {
        this.upcoming = dayjs(trip.date).isAfter(dayjs());
      }
    })
    return results
  };

  // Method to get the total cost of a trip + 10%
  static calcTripCost = (dest, travelerCount, duration) => {
    return (dest.getEstimatedFlightCostPerPerson() * travelerCount +
      dest.getEstimatedLodgingCostPerDay() * duration) * 1.1;
  }
 
// gets the proposed trip cost given the destinationID
  static getProposedTripCost(destinationID, travelerCount, duration) {

    const dest = Destination.getDestinationByID(destinationID);

    //calculates single trip cost and adds 10%
    return Trip.calcTripCost(dest, travelerCount, duration);

  }
};

export default Trip;
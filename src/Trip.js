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

  getID(){
    return this.id;
  }
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

  isApproved() {
    return this.status === 'approved';
  };

  isPending() {
    return this.status === 'pending';
  };


 static addATrip(tripData) {
  // adds id to new trip 1 more than max id found
  tripData.id = Trip.allTrips.reduce((acc, currentTrip) => {
    if (acc < currentTrip.getID()) {
      acc = currentTrip.getID();
    }
    return acc
  }, -1) + 1;
  return [new Trip(tripData), tripData]
  }


  static getTravelerTrips(userID) {
    const results = Trip.allTrips.filter(trip => trip.getUserID() === userID)
    results.forEach(trip => {
      if (this?.upcoming === undefined) {
        this.upcoming = dayjs(trip.date).isAfter(dayjs());
      }
    })
    return results
  };
  
  static calcTripCost = (dest, travelerCount, duration) => {
    return (dest.getEstimatedFlightCostPerPerson() * travelerCount +
    dest.getEstimatedLodgingCostPerDay() * duration) * 1.1;
  }
  // Method to get the total cost of the trip
  getSingleTripCost() {
  
    const dest = Destination.getDestinationByID(this.getDestinationID());
    const travelerCount = this.getTravelers();
    const duration = this.getDuration();

    //calculates single trip cost and adds 10%
    return Trip.calcTripCost(dest, travelerCount, duration);
  }

  static getProposedTripCost(destinationID, travelerCount, duration) {
  
    const dest = Destination.getDestinationByID(destinationID);

    //calculates single trip cost and adds 10%
    return Trip.calcTripCost(dest, travelerCount, duration);

  }
};

export default Trip;
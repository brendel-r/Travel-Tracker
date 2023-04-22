import dayjs from 'dayjs'

class Trip {
  static allTrips = [];
  constructor({id, userID, destinationID, travelers, date, duration, status}) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = status;
    
    Trip.allTrips.push(this);
  };

  // Method to get all trips
getAllTrips() {
  return Trip.allTrips;
};

getUserID() { 
  return this.userID;
}

isApproved() {
  return this.status === 'approved';
}


static getTravelerTrips(userID) {
  const results = Trip.allTrips.filter(trip => trip.getUserID() === userID)
  results.forEach(trip => {
    if(this?.upcoming === undefined) {
    this.upcoming = dayjs(trip.date).isAfter(dayjs());
    }
  })
  return results
};
//  // Method to get the total cost of the trip
getSingleTripCost(){
  const dest = getDesinationByID(this.destinationID);
  const travelerCount = this.travelers;
  const duration = this.duration;

  //calculate single trip cost and adds 10%
  return (dest.getEstimatedFlightCostPerPerson() * travelerCount + 
  dest.getEstimatedLodgingCostPerDay() * duration) * 1.1;
}




};

export default Trip;
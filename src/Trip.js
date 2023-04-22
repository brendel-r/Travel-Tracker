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


static getTravelerTrips(userID) {
  debugger
  const results = Trip.allTrips.filter(trip => trip.getUserID() === userID)
  console.log(results)
  results.forEach(trip => {
    console.log(trip)
    this.upcoming = dayjs(trip.date).isAfter(dayjs());
    console.log(this.upcoming)
  })
  return results
};



};

export default Trip;
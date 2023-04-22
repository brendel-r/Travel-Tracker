class Traveler {
  static allTravelers = []
  constructor({ id, name, travelerType }) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType

    Traveler.allTravelers.push(this);
  }

  getID() {
    return this.id;
  }

  static getNameById(id) {
    return Traveler.allTravelers.find(t => t.getID() === id).getName();
  }

  getName() {
    return this.name;
  }

  getTotalCost() {
    return Trip.getTravelerTrips(this.id).filter(
      trip => trip.isAppproved()).reduce((acc, currentTrip) =>
        (acc + currentTrip.getSingleTripCost()), 0)
  };

  // // Method to add a new trip to a traveler's list of trips
  // addTrip(trip) {

  //   }

  // Method to get a list of all the traveler's trips
  // getTrips(allTrips) {
  //   this.trips = allTrips.filter(trip => trip.userID === this.id)
  //   }

  // Method to get the total amount spent on trips by a traveler
}


export default Traveler;
import Trip from './Trip';

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
    return Trip.getTravelerTrips(this.getID()).filter(
      trip => trip.isApproved()).reduce((acc, currentTrip) =>
      (acc + currentTrip.getSingleTripCost()), 0)
  };

  static getRandomTraveler() {
    return Traveler.allTravelers[Math.trunc(Math.random() * Traveler.allTravelers.length)]
  }

  //using for debugging
  static getTravelerByID(userID) {
    return Traveler.allTravelers.find(traveler => {
      return traveler.getID() === userID;
    })
  }
}


export default Traveler;
import Trip from './Trip';

class Traveler {
  static allTravelers = []
  constructor({ id, name, travelerType }) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType

    Traveler.allTravelers.push(this);
  }

  //getters
  getID() {
    return this.id;
  }
  getName() {
    return this.name;
  }

  //gets total cost for approved trips for one traveler
  getTotalCost() {
    return Trip.getTravelerTrips(this.getID()).filter(
      trip => trip.isApproved()).reduce((acc, currentTrip) =>
        (acc + currentTrip.getSingleTripCost()), 0)
  };

  //finds a traveler by id and returns name
  static getNameById(id) {
    return Traveler.allTravelers.find(t => t.getID() === id).getName();
  }

  //picks a random traveler out of all travelers
  static getRandomTraveler() {
    return Traveler.allTravelers[Math.trunc(Math.random() * Traveler.allTravelers.length)]
  }

  //finds a traveler using its id field 
  static getTravelerByUserID(userID) {
    return Traveler.allTravelers.find(traveler => {
      return traveler.getID() === userID;
    })
  }
}


export default Traveler;
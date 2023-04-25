class Destination {
  static allDestinations = [];
  constructor({ id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson, image, alt }) {
    this.id = id;
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;
    this.image = image;
    this.alt = alt;

    Destination.allDestinations.push(this);
  };

  //find and individual destination instance by ID
  static getDestinationByID(id) {
    return Destination.allDestinations.find(d => d.getID() === id);
  };

//getters
  getID() {
    return this.id;
  };

  getDestination() {
    return this.destination;
  };
  
  getImage() {
    return this.image;
  };

  getAlt() {
    return this.alt;
  };

  getEstimatedFlightCostPerPerson() {
    return this.estimatedFlightCostPerPerson;
  };

  getEstimatedLodgingCostPerDay() {
    return this.estimatedLodgingCostPerDay;
  };
};
export default Destination;

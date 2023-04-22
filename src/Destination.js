class Destination {
  constructor({id, destination, costPerDay, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson}) {
    this.id = id;
    this.destination = destination;
    this.costPerDay = costPerDay;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;
  };
};


export default Destination;

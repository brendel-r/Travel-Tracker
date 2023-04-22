class Destination {
  static allDestinations= [];
  constructor({id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson}) {
    this.id = id;
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;

    Destination.allDestinations.push(this);
  };

  getDestinationByID(tripID)  {
    return Destination.allDestinations.find(d => d.getID() === tripID);
  };
  
  getID(){
    return this.id;
  };
  
  getEstimatedFlightCostPerPerson(){
    return this.estimatedFlightCostPerPerson;
  };

  getEstimatedLodgingCostPerDay(){
    return this.estimatedLodgingCostPerDay;
  };
  
};


export default Destination;

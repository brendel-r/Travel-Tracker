class Traveler {
  static allTravelers = []
  constructor({id, name, travelerType}) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType
    // this.trips = [];

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

 
}


export default Traveler;
import { expect } from 'chai';
import Traveler from '../src/Traveler'
import Trip from  '../src/Trip'
import Destination from '../src/Destination';

describe ('Traveler', () => {
  
  it('should return the traveler ID', () => {
      const traveler = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
      expect(traveler.getID()).to.equal(1);
  });

  it('should return the traveler name', () => {
    const traveler = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
    expect(traveler.getID()).to.equal(1);
});

  it('should return the total cost of all approved trips for the traveler', () => {
    // Create some trips for the traveler
    const traveler = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
    const trip1 = new Trip({ id: 1, userID: 1, destinationID: 1, travelers: 1, date: '2022-01-01', duration: 5, status: 'approved' });
    const trip2 = new Trip({ id: 2, userID: 1, destinationID: 2, travelers: 2, date: '2022-02-01', duration: 3, status: 'approved' });

    // Add some destinations for the trips
    const dest1 = new Destination({ id: 1, destination: 'Paris', estimatedLodgingCostPerDay: 100, estimatedFlightCostPerPerson: 200, image: '', alt: '' });
    const dest2 = new Destination({ id: 2, destination: 'London', estimatedLodgingCostPerDay: 150, estimatedFlightCostPerPerson: 300, image: '', alt: '' });

    expect(traveler.getTotalCost()).to.equal(2255);
  });

  it('should return the name of the traveler with the given ID', () => {
    const traveler1 = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
    const traveler2 = new Traveler({ id: 2, name: 'Jane Doe', travelerType: 'leisure' });
    expect(Traveler.getNameById(2)).to.equal('Jane Doe');
  });

  it('should return the traveler name', () => {
    const traveler = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
    expect(traveler.getName()).to.equal('John Doe');
  });
  

  it('should return the traveler with the given ID', () => {
    const traveler1 = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
    const traveler2 = new Traveler({ id: 2, name: 'Jane Doe', travelerType: 'leisure' });

    expect(Traveler.getTravelerByUserID(1)).to.deep.equal(traveler1);
  });
});
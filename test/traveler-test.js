import { expect } from 'chai';
import { travelerTestData } from '../src/Data/traveler-test-data'
import Traveler from '../src/Traveler'

describe('Traveler', () => {

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  describe( 'getName', () => {
    it('should return the name of the traveler', () => {
      const traveler = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
      expect(traveler.getName()).to.equal('John Doe');
    });
  });

  describe('getTotalCost', () => {
    it('should return the total cost of all approved trips for the traveler', () => {
      // create some trips for the traveler
      const trip1 = new Trip({ id: 1, travelerId: 1, destination: 'New York', cost: 500, status: 'approved' });
      const trip2 = new Trip({ id: 2, travelerId: 1, destination: 'Paris', cost: 1000, status: 'approved' });
      const trip3 = new Trip({ id: 3, travelerId: 1, destination: 'Tokyo', cost: 1500, status: 'pending' });
      // get the total cost of approved trips for the traveler
      const traveler = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
      const totalCost = traveler.getTotalCost();
      expect(totalCost).to.equal(1500); // trip1 cost + trip2 cost
    });
  });

  describe('getRandomTraveler', () => {
    it('should return a random traveler from the list of all travelers', () => {
      // create some travelers
      const traveler1 = new Traveler({ id: 1, name: 'John Doe', travelerType: 'business' });
      const traveler2 = new Traveler({ id: 2, name: 'Jane Doe', travelerType: 'leisure' });
      const traveler3 = new Traveler({ id: 3, name: 'Bob Smith', travelerType: 'business' });
      const traveler4 = new Traveler({ id: 4, name: 'Alice Johnson', travelerType: 'leisure' });
      // get a random traveler
      const randomTraveler = Traveler.getRandomTraveler();
      expect([traveler1, traveler2, traveler3, traveler4]).to.include(randomTraveler);
    });
  });

});
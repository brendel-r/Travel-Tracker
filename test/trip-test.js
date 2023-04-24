import { expect } from 'chai';
// import { tripTestData } from '../src/Data/trip-test-data';
import Trip from '../src/Trip';
// import { destinationTestData } from '../src/Data/destination-test-data'
import Destination from '../src/Destination';


describe('Trip', () => {

  let trip1;
  let trip2;

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });


  describe('getSingleTripCost', () => {
    it('should calculate the correct cost for a trip', () => {
      const trip = new Trip({
        id: 1,
        userID: 123,
        destinationID: 456,
        travelers: 2,
        date: '2023-05-01',
        duration: 7,
        status: 'approved'
      });
      const cost = trip.getSingleTripCost();
      expect(cost).to.equal(2638.8); 
    });
  });

  describe('getTravelerTrips', () => {
    it('should return an array of trips for a given user ID', () => {
      const userTrips = Trip.getTravelerTrips(123);
      expect(userTrips).to.be.an('array');
      expect(userTrips).to.have.lengthOf(1);
      expect(userTrips[0].id).to.equal(1);
    });
  });

  describe('isApproved', () => {
    it('should return true if the trip status is approved', () => {
      const trip = new Trip({
        id: 1,
        userID: 123,
        destinationID: 456,
        travelers: 2,
        date: '2023-05-01',
        duration: 7,
        status: 'approved'
      });
      expect(trip.isApproved()).to.be.true;
    });

    it('should return false if the trip status is not approved', () => {
      const trip = new Trip({
        id: 1,
        userID: 123,
        destinationID: 456,
        travelers: 2,
        date: '2023-05-01',
        duration: 7,
        status: 'pending'
      });
      expect(trip.isApproved()).to.be.false;
    });
  });

  describe('isPending', () => {
    it('should return true if the trip status is pending', () => {
      const trip = new Trip({
        id: 1,
        userID: 123,
        destinationID: 456,
        travelers: 2,
        date: '2023-05-01',
        duration: 7,
        status: 'pending'
      });
      expect(trip.isPending()).to.be.true;
    });

    it('should return false if the trip status is not pending', () => {
      const trip = new Trip({
        id: 1,
        userID: 123,
        destinationID: 456,
        travelers: 2,
        date: '2023-05-01',
        duration: 7,
        status: 'approved'
      });
      expect(trip.isPending()).to.be.false;
    });
  });
});
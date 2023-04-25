import { expect } from 'chai';
import Trip from '../src/Trip';

describe('Trip', () => {

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should create a new trip object', () => {
    const tripData = {
      id: 1,
      userID: 1,
      destinationID: 1,
      travelers: 2,
      date: '2023-05-15',
      duration: 5,
      status: 'approved'
    };
    const trip = new Trip(tripData);
    expect(trip).to.be.an.instanceOf(Trip);
    expect(trip.id).to.equal(tripData.id);
    expect(trip.userID).to.equal(tripData.userID);
    expect(trip.destinationID).to.equal(tripData.destinationID);
    expect(trip.travelers).to.equal(tripData.travelers);
    expect(trip.date).to.equal(tripData.date);
    expect(trip.duration).to.equal(tripData.duration);
    expect(trip.status).to.equal(tripData.status);
    expect(Trip.allTrips).to.include(trip);
  });

  it('should return the trip id', () => {
    const trip = new Trip({ id: 1 });
    expect(trip.getID()).to.equal(1);
  });

  it('should return the trip destination ID', () => {
    const trip = new Trip({ destinationID: 1 });
    expect(trip.getDestinationID()).to.equal(1);
  });

  it('should return the number of travelers on the trip', () => {
    const trip = new Trip({ travelers: 2 });
    expect(trip.getTravelers()).to.equal(2);
  });

  it('should return the trip duration', () => {
    const trip = new Trip({ duration: 5 });
    expect(trip.getDuration()).to.equal(5);
  });

  it('should return the trip date', () => {
    const trip = new Trip({ date: '2023-05-15' });
    expect(trip.getDate()).to.equal('2023-05-15');
  });

  it('should return the user ID associated with the trip', () => {
    const trip = new Trip({ userID: 1 });
    expect(trip.getUserID()).to.equal(1);
  });
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
    trip.status = 'pending';
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


  // Test the getAllTrips() function
  it('should return an array of all trips', () => {
    const trip1 = new Trip({ destinationID: 1 })
    const trip2 = new Trip({ destinationID: 2 })
    const allTrips = [trip1, trip2]
    const trips = Trip.getAllTrips();
    console.log('getAllTrips function')
    expect(trips).to.be.an('array');
    expect(trips).to.include(trip1);
    expect(trips).to.include(trip2);
  });

})
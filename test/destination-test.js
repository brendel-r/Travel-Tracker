import { expect } from 'chai';
import Destination from '../src/Destination';

describe('Destination', () => {
  const sampleDestination = new Destination({
    id: 1,
    destination: 'Paris',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 500,
    image: 'https://example.com/image.jpg',
    alt: 'Paris skyline'
  });

  it('returns the destination instance with the specified ID', () => {
    const foundDestination = Destination.getDestinationByID(1);
    expect(foundDestination).to.deep.equal(sampleDestination);
  });

  it('returns the ID of the destination', () => {
    expect(sampleDestination.getID()).to.equal(1);
  });

  it('returns the name of the destination', () => {
    expect(sampleDestination.getDestination()).to.equal('Paris');
  });

  it('returns the URL of the destination image', () => {
    expect(sampleDestination.getImage()).to.equal('https://example.com/image.jpg');
  });

  it('returns the alt text of the destination image', () => {
    expect(sampleDestination.getAlt()).to.equal('Paris skyline');
  });

  it('returns the estimated flight cost per person for the destination', () => {
    expect(sampleDestination.getEstimatedFlightCostPerPerson()).to.equal(500);
  });

  it('returns the estimated lodging cost per day for the destination', () => {
    expect(sampleDestination.getEstimatedLodgingCostPerDay()).to.equal(100);
  });

  it('returns undefined if no destination instance with the specified ID is found', () => {
    const foundDestination = Destination.getDestinationByID(999);
    expect(foundDestination).to.be.undefined;
  });
});
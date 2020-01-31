/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import SimilarListingsContainer from '../client/src/components/SimilarListingsContainer.jsx';

const Listing1 = {
  streetAddress: {
    addressLineOne: '4742 Batz Fort',
    addressLineTwo: 'Suite 918',
    city: 'Enosview',
    state: 'HI',
    zip: '28104',
  },
  nextOpenHouse: { startingTime: '3PM', endingTime: '5PM' },
  notableFeatures: ['Central Air'],
  _id: '5e2fbfa7ae736a4854bb4ac6',
  listingId: 79791238,
  imageUrl: 'https://i.pinimg.com/originals/2b/fb/6b/2bfb6b646097abbc26d218b78370c5c9.jpg',
  price: 1446000,
  beds: 1,
  baths: 3.5,
  squareFootage: 2554,
  hotHome: false,
  __v: 0,
};
describe('<SimilarListingsContainer />', () => {
  const wrapper = mount(<SimilarListingsContainer data={Listing1} />);

  it('should not be empty', () => {
    expect(wrapper.find('.listingContainer').children.length).not.toBe(0);
  });

  it('should contain two children: the listing image and the listing data', () => {
    expect(wrapper.find('.listingContainer').children().length).toBe(2);
    expect(wrapper.find('.listingImage').exists()).toBe(true);
    expect(wrapper.find('.listingData').exists()).toBe(true);
  });
});

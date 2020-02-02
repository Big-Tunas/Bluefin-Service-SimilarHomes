/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

// eslint-disable-next-line import/extensions
import ListingData from '../client/src/components/ListingData.jsx';

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

const Listing2 = {
  streetAddress: {
    addressLineOne: '31262 Jennifer Unions',
    addressLineTwo: null,
    city: 'Lake Chelsey',
    state: 'HI',
    zip: '82972-2956',
  },
  nextOpenHouse: { dayOfWeek: 'Sun', startingTime: '9AM', endingTime: '5PM' },
  notableFeatures: ['Central Air', 'Fireplace'],
  _id: '5e2fbfa8ae736a4854bb4b02',
  listingId: 93408581,
  imageUrl: 'https://i.pinimg.com/originals/2b/fb/6b/2bfb6b646097abbc26d218b78370c5c9.jpg',
  price: 1118000,
  beds: 4,
  baths: 1,
  squareFootage: 474,
  hotHome: false,
  __v: 0,
};

const Listing3 = {
  streetAddress: {
    addressLineOne: '31262 Jennifer Unions',
    addressLineTwo: null,
    city: 'Lake Chelsey',
    state: 'HI',
    zip: '82972-2956',
  },
  nextOpenHouse: { dayOfWeek: 'Sun', startingTime: '9AM', endingTime: '5PM' },
  notableFeatures: ['Central Air', 'Fireplace'],
  _id: '5e2fbfa8ae736a4854bb4b02',
  listingId: 93408581,
  imageUrl: 'https://i.pinimg.com/originals/2b/fb/6b/2bfb6b646097abbc26d218b78370c5c9.jpg',
  price: 1118000,
  beds: 4,
  baths: 1,
  squareFootage: null,
  hotHome: false,
  __v: 0,
};

describe('<ListingData />', () => {
  const wrapper = mount(<ListingData info={Listing1} />);

  it('should have a properly-formatted price', () => {
    expect(wrapper.find('.price').text()).toEqual('$1,446,000');
  });

  it('should show the full address', () => {
    expect(wrapper.find('.address').text()).toEqual('4742 Batz Fort Suite 918, Enosview, HI 28104');
  });

  it('should have an accurate bed/bath count', () => {
    expect(wrapper.find('.beds').text()).toEqual('1 Bed');
    expect(wrapper.find('.baths').text()).toEqual('3.5 Baths');
  });

  it('should differentiate between single beds/baths and multi beds/baths', () => {
    const wrapper2 = mount(<ListingData info={Listing2} />);
    expect(wrapper2.find('.beds').text()).toEqual('4 Beds');
    expect(wrapper2.find('.baths').text()).toEqual('1 Bath');
  });

  it('should have a properly-formatted area designation', () => {
    expect(wrapper.find('.area').text()).toEqual('2,554 Sq. Ft.');
  });

  it('should show the right number of tags based on passed-in data', () => {
    const children = wrapper.find('.tagsContainer').children();
    expect(children.length).toBe(1);
    expect(wrapper.find('.tagsContainer').childAt(0).text()).toEqual('Central Air');
  });

  it('should properly handle empty data fields', () => {
    const wrapper3 = mount(<ListingData info={Listing3} />);
    expect(wrapper3.find('.area').text()).toEqual('- Sq. Ft.');
  });
});

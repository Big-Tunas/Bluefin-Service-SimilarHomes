import React from 'react';
import { shallow, render, mount } from 'enzyme';

import ListingImage from '../client/src/components/ListingImage.jsx';

// describe('basic test functionality', () => {
//   it('should pass for a simple test', () => {
//     expect(true).toBeTruthy();
//   });
// });

describe('ListingImage', () => {
  let source = "https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg";

  it('renders with an image tag', () => {
    let wrapper = mount(<ListingImage />);
    expect(wrapper.find('img')).toBeDefined();
  });

  it('has a hard-coded source for the image tag', () => {
    let wrapper = mount(<ListingImage />);
    expect(wrapper.find('img').prop('src')).toBe(source);
  });
});
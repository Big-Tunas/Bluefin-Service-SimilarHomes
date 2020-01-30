/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Container from '../client/src/components/SimilarListingsContainer.jsx';

describe('<SimilarListingsContainer />', () => {
  const wrapper = mount(<Container />);

  it('should not be empty', () => {
    expect(wrapper.find('.listingContainer').children.length).not.toBe(0);
  });

  it('should contain two children: the listing image and the listing data', () => {
    expect(wrapper.find('.listingContainer').children).to.have.lengthOf(2);
    expect(wrapper.find('.listingImage').exists()).toBe(true);
    expect(wrapper.find('.listingData').exists()).toBe(true);
  });
});

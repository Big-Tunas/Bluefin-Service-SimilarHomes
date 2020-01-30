/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import ListingImage from '../client/src/components/ListingImage.jsx';

describe('<ListingImage />', () => {
  const source = 'https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg';

  it('renders with an image tag', () => {
    const wrapper = mount(<ListingImage />);
    expect(wrapper.find('img')).toBeDefined();
  });

  it('has a hard-coded source for the image tag if no source is provided', () => {
    const wrapper = mount(<ListingImage />);
    expect(wrapper.find('img').prop('src')).toBe(source);
  });

  it('uses the passed-in source if one is provided', () => {
    const wrapper = mount(<ListingImage src="https://www.cupapizarras.com/wp-content/uploads/2018/09/casa-pasiva-contemporanea-asturias.jpg" />);
    expect(wrapper.find('img').prop('src')).not.toBe(source);
  });
});

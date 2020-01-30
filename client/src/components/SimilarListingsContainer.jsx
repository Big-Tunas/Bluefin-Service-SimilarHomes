/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import ListingImage from './ListingImage.jsx';
import ListingData from './ListingData.jsx';

const SimilarListingsContainer = ({
  imageUrl,
  hotHome,
  nextOpenHouse,
  ...rest
}) => (
  <div className="listing">
    <ListingImage src={imageUrl} hot={hotHome} openHouse={nextOpenHouse} />
    <ListingData data={rest} />
  </div>

);

SimilarListingsContainer.propTypes = {
  imageUrl: PropTypes.string,
  hotHome: PropTypes.bool,
  nextOpenHouse: PropTypes.objectOf(PropTypes.object),
};

SimilarListingsContainer.defaultProps = {
  imageUrl: 'https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg',
  hotHome: false,
  nextOpenHouse: null,
};

export default SimilarListingsContainer;

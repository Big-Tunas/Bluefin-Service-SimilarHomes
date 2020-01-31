/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import ListingImage from './ListingImage.jsx';
import ListingData from './ListingData.jsx';

const SimilarListingsContainer = ({ data }) => {
  const {
    imageUrl,
    hotHome,
    nextOpenHouse,
    ...rest
  } = data;

  return (
    <div className="listingContainer">
      <ListingImage src={imageUrl} hot={hotHome} openHouse={nextOpenHouse} />
      <ListingData info={rest} />
    </div>
  );
};

export default SimilarListingsContainer;

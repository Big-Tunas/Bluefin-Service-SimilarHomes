/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import ListingImage from './ListingImage.jsx';
import ListingData from './ListingData.jsx';

const SimilarListingsContainer = ({ data }) => {
  const ListingContainer = styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    width: 297px;
    margin: 0;
    border: 1px gray solid;
    margin-right: 8px;
    margin-bottom: 5px;
  `;

  const {
    imageUrl,
    hotHome,
    nextOpenHouse,
    ...rest
  } = data;

  return (
    <ListingContainer className="listingContainer">
      <div>
        <ListingImage src={imageUrl} hot={hotHome} openHouse={nextOpenHouse} />
      </div>
      <div>
        <ListingData info={rest} />
      </div>
    </ListingContainer>
  );
};

export default SimilarListingsContainer;

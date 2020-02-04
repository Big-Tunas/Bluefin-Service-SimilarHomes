/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import ListingImage from './ListingImage.jsx';
import ListingData from './ListingData.jsx';

const SimilarListingsContainer = ({ data }) => {
  const ListingWrapper = styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    box-shadow: 0 0 3px 3px lightgrey;
    scroll-snap-align: start;
    overflow-y: none;

    &:hover {
      box-shadow: 0px 0px 5px 5px lightgrey;
      cursor: pointer;
    }
  `;

  const {
    imageUrl,
    hotHome,
    nextOpenHouse,
    ...rest
  } = data;

  return (
    <ListingWrapper className="listingContainer">
      <div>
        <ListingImage src={imageUrl} hot={hotHome} openHouse={nextOpenHouse} />
      </div>
      <div>
        <ListingData info={rest} />
      </div>
    </ListingWrapper>
  );
};

export default SimilarListingsContainer;

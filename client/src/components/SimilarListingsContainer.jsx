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
    width: 100%;
    margin: 0;
    border: 1px hidden;
    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 2px 2px lightgrey;
    scroll-snap-align: start;

    &:hover {
      box-shadow: 0px 0px 6px 6px lightgrey;
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

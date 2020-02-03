import React from 'react';
import SimilarListingsContainer from './SimilarListingsContainer.jsx';

const ScrollingContainer = ({ listings }) => {
  const containers = listings.map((l) => <SimilarListingsContainer data={l} />);
  return containers;
};

export default ScrollingContainer;

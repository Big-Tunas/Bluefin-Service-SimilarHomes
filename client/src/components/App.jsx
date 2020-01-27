import React from 'react';
import ListingImage from './ListingImage.jsx';
import styled from 'styled-components';
import axios from 'axios';

const NearbyListingsContainer = (props) => {

  axios.get(
    'http://localhost:4004/image',
    {city: "San Francisco"},
    (err, image) => {
      if (err) {
        console.log(err);
      } else {
        return (
          <ListingImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg" alt="4633 Gaviota Court, Bonita, CA 91902" />
        );
      }
    }
  );

  return (
    <ListingImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg" alt="4633 Gaviota Court, Bonita, CA 91902" />
  );
};

export default NearbyListingsContainer;
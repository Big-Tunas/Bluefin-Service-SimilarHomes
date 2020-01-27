import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ListingImage = (props) => {

  const CardImage = styled.img`
    width: 297px;
    height: 198px;
    overflow: none;
  `;

  return (
    // <CardImage src="https://big-tunas-similar-homes.s3-us-west-1.amazonaws.com/images/image-1.jpg"/>
    <CardImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg"/>
  );
};

export default ListingImage;
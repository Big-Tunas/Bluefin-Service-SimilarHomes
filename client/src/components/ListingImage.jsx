import React from 'react';
import styled from 'styled-components';

const ListingImage = (props) => {

  const CardImage = styled.img`
    width: 297px;
    height: 198px;
    overflow: none;
  `;

  return (
    <CardImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg" alt="4633 Gaviota Court, Bonita, CA 91902" />
  );
};

export default ListingImage;
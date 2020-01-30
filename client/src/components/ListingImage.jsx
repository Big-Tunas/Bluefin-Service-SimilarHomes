import React from 'react';
import styled from 'styled-components';

const ListingImage = (props) => {
  const CardImage = styled.img`
    width: 297px;
    height: 198px;
    overflow: none;
  `;

  let image;

  if (!props.src) {
    image = <CardImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg" />;
  } else {
    image = <CardImage src={props.src} />;
  }

  return image;
};

export default ListingImage;

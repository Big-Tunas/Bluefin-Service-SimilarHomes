import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ListingImage = (props) => {

  const CardImage = styled.img`
    width: 297px;
    height: 198px;
    overflow: none;
  `;

  if (!props.src) {
    return (
      <CardImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg"/>
    );
  } else {
    return (
      <CardImage src={props.src}/>
    );
  }

};

export default ListingImage;
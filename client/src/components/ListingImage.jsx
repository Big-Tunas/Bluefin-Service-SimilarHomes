/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ListingImage = ({ src, openHouse, hot }) => {
  const Container = styled.div`
    display: block
    position: relative;
    width: 100%;
    height: 100%;
  `;

  const CardImage = styled.img`
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 356px;
    height: 237px;
    overflow: none;
    z-index: -1 !important;
  `;

  const SpanBar = styled.div`
    position: absolute;
    display: block;
    z-index: 1 !important;
    top: 0;
    left: .25rem;
  `;

  const HomeSpan = styled.span`
    display: inline-block;
    position: relative;
    font-size: 10px;
    font-weight: 600;
    font-family: "Libre Franklin", sans-serif;
    color: #fff;
    text-transform: uppercase;
    margin: 4px 7px 4px 0;
    background-color: #E96727;
    border-radius: 16px;
    padding: 4px 8px;
    vertical-align: text-top;
    line-height: 1em;
  `;

  const TimeSpan = styled.span`
    display: inline-block;
    position: relative;
    font-size: 10px;
    font-weight: 600;
    font-family: "Libre Franklin", sans-serif;
    color: #fff;
    text-transform: uppercase;
    margin: 4px 7px 4px 0;
    background-color: rgb(115, 187, 60);
    border-radius: 16px;
    padding: 4px 8px;
    vertical-align: text-top;
    line-height: 1em;
  `;

  let image;
  let hotSpan;
  let viewTime;

  if (hot) {
    hotSpan = <HomeSpan>Hot Home</HomeSpan>;
  }

  if (openHouse) {
    const time = `Open ${openHouse.dayOfWeek}, ${openHouse.startingTime} to ${openHouse.endingTime}`;
    viewTime = <TimeSpan>{time}</TimeSpan>;
  }

  if (!src) {
    image = <CardImage className="listingImage" src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg" />;
  } else {
    image = <CardImage className="listingImage" src={src} />;
  }

  return (
    <Container>
      {image}
      <SpanBar>
        {viewTime}
        {hotSpan}
      </SpanBar>
    </Container>
  );
};

export default ListingImage;

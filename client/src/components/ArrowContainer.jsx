import React from 'react';
import styled from 'styled-components';

const ArrowContainer = ({ direction }) => {
  const ArrowWrapper = styled.div`
      position: relative;
      display: inline-block;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      background-color: white;
      border: 1px solid grey;

      &:hover {
        cursor: pointer;
      }
    `;

  const InnerWrapper = styled.svg`
    width: 14px;
    height: 12px;
    position: absolute;
    top: calc(50% - 6px);
    left: calc(50% - 7px);
  `;
  const left = (
    <InnerWrapper id="left-arrow" name="left">
      <path
        d="M 10 1
           L 4 6
           L 10 11"
        stroke="grey"
        strokeWidth="2"
        fill="none"
      />
    </InnerWrapper>
  );

  const right = (
    <InnerWrapper id="right-arrow" name="right">
      <path
        d="M 4 1
           L 10 6
           L 4 11"
        stroke="grey"
        strokeWidth="2"
        fill="none"
      />
    </InnerWrapper>
  );

  const scrollLeft = () => {
    const target = document.getElementById('scrolling-container');
    target.scrollTo({
      top: 0,
      left: target.scrollLeft - target.clientWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const target = document.getElementById('scrolling-container');
    target.scrollTo({
      top: 0,
      left: target.scrollLeft + target.clientWidth,
      behavior: 'smooth',
    });
  };

  let arrow;
  if (direction === 'previous') {
    arrow = <ArrowWrapper dir="left" onClick={() => scrollLeft()}>{left}</ArrowWrapper>;
  } else {
    arrow = <ArrowWrapper dir="right" onClick={() => scrollRight()}>{right}</ArrowWrapper>;
  }

  return arrow;
};

export default ArrowContainer;

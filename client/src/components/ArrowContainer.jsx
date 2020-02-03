import React from 'react';
import styled from 'styled-components';

const ArrowContainer = ({ direction, left }) => {
  const ArrowWrapper = styled.div`
      position: absolute;
      display: block;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      background-color: white;
      border: 1px solid grey;
      z-index: 1;
      top: calc(65% - 25px);
      left: ${(prop) => (prop.dir === 'left') ? '-12.5px' : 'calc(100% - 12.5px)'};
      visibility: ${(prop) =>  prop.dir === 'left' ? 'hidden' : 'visible'};

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
  const leftArrow = (
    <InnerWrapper name="left">
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

  const rightArrow = (
    <InnerWrapper name="right">
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

  const scrollLeft = (e) => {
    const target = document.getElementById('scrolling-container');
    const leftDiv = document.getElementById('left-arrow');
    target.scrollTo({
      top: 0,
      left: target.scrollLeft - target.clientWidth,
      behavior: 'smooth',
    });
    if (target.scrollLeft <= target.clientWidth * 1.5) {
      leftDiv.style.visibility = 'hidden';
    }
    if (target.scrollLeft <= target.scrollWidth - target.clientWidth) {
      document.getElementById('right-arrow').style.visibility = 'visible';
    }
  };

  const scrollRight = (e) => {
    const target = document.getElementById('scrolling-container');
    const rightDiv = document.getElementById('right-arrow');
    target.scrollTo({
      top: 0,
      left: target.scrollLeft + target.clientWidth,
      behavior: 'smooth',
    });
    if (target.scrollLeft === 0) {
      document.getElementById('left-arrow').style.visibility = 'visible';
    }
    if (target.scrollLeft > target.scrollWidth - (1.75 * target.clientWidth)) {
      rightDiv.style.visibility = 'hidden';
    }
  };

  let arrow;
  if (direction === 'previous') {
    arrow = <ArrowWrapper id="left-arrow" dir="left" onClick={(e) => scrollLeft(e)}>{leftArrow}</ArrowWrapper>;
  } else {
    arrow = <ArrowWrapper id="right-arrow" dir="right" onClick={(e) => scrollRight(e)}>{rightArrow}</ArrowWrapper>;
  }

  return arrow;
};

export default ArrowContainer;

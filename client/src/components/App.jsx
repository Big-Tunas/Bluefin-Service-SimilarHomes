/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ScrollingContainer from './ScrollingContainer.jsx';
import ArrowContainer from './ArrowContainer.jsx';

class NearbyListingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      left: 0,
    };

    this.updateLeft = this.updateScrollPosition.bind(this);
  }

  componentDidMount() {
    const { listings } = this.state;
    if (!{ listings }.length) {
      this.getListings();
    }
  }

  getListings() {
    axios.get('/similar-listings')
      .then((listings) => {
        this.setState({
          listings: listings.data,
        });
      });
  }

  updateScrollPosition(e) {
    const { left } = this.state;
    let newLeft;
    if (e.target.getAttribute('name') === 'left') {
      newLeft = Math.max(0, left - 732);
    } else if (e.target.getAttribute('name') === 'right') {
      newLeft = Math.min(2600, left + 732);
    }
    this.setState({
      left: newLeft,
    });
  }

  render() {
    const { listings, left } = this.state;
    const update = this.updateLeft;

    const MediaCarousel = styled.div`
      justify: center;
      display: grid;
      grid-gap: 0 16px;
      grid-template-columns: repeat(${listings.length}, 356px);
      width: 732px;
      height: 100%;
      border: hidden;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      &::-webkit-scrollbar {
        display: none;
      }
    `;

    const AppWrapper = styled.div`
      position: relative;
      display: block;
      min-width: 732px;
    `;

    const output = (
      <AppWrapper id="section-title">
        <h2 style={{
          'font-family': '"Libre Franklin", sans-serif',
          'font-weight': '400',
        }}
        >
          Nearby Similar Homes
        </h2>
        <MediaCarousel className="similar-listings" id="scrolling-container">
          <ArrowContainer direction="previous" dist={left} update={update} />
          <ScrollingContainer listings={listings} onScroll={update} />
          <ArrowContainer direction="next" dist={left} update={update} />
        </MediaCarousel>
      </AppWrapper>
    );
    return output;
  }
}

export default NearbyListingsComponent;

/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import SimilarListingsContainer from './SimilarListingsContainer.jsx';
import ScrollingContainer from './ScrollingContainer.jsx';
import ArrowContainer from './ArrowContainer.jsx';

class NearbyListingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      left: 0,
    };
  }

  componentDidMount() {
    const { listings } = this.state;
    if (!{ listings }.length) {
      this.getListings();
    }
  }

  getListings() {
    axios.get('http://localhost:4004/listings')
      .then((listings) => {
        this.setState({
          listings: listings.data,
        });
      });
  }

  showArrows(str) {
    const { leftPosition } = this.state;
    const scrollLocation = leftPosition;
    if (str === 'right') {
      this.setState({
        leftPosition: scrollLocation + 732,
      });
    } else {
      this.setState({
        leftPosition: Math.max(scrollLocation - 732, 0),
      });
    }
  }

  render() {
    const { listings, left } = this.state;

    const MediaCarousel = styled.div`
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(${listings.length}, 356px);
      grid-template-rows: 1fr;
      width: 732px;
      height: 100%;
      border: hidden;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      &::-webkit-scrollbar {
        display: none;
      }
    `;

    const output = (
      <div id="section-title">
        <h2 style={{
          'font-family': '"Libre Franklin", sans-serif',
          'font-weight': '400',
        }}
        >
          Nearby Similar Homes
        </h2>
        <MediaCarousel className="similar-listings" id="scrolling-container">
          <ArrowContainer direction="previous" dist={left} />
          <ScrollingContainer listings={listings} />
          <ArrowContainer direction="next" dist={left} />
        </MediaCarousel>
      </div>
    );
    return output;
  }
}

export default NearbyListingsComponent;

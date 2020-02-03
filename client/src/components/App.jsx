/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import SimilarListingsContainer from './SimilarListingsContainer.jsx';
import ArrowContainer from './ArrowContainer.jsx';

class NearbyListingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
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

  render() {
    const { listings } = this.state;
    const containers = listings.map((l) => <SimilarListingsContainer data={l} />);

    const ScrollingComponent = styled.div`
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
        <h2 style={{ 'font-family': '"Libre Franklin", sans-serif' }}>Nearby Similar Homes</h2>
        <ArrowContainer direction="previous" />
        <ArrowContainer direction="next" />
        <ScrollingComponent className="similar-listings" id="scrolling-container">
          {containers}
        </ScrollingComponent>
      </div>
    );
    return output;
  }
}

export default NearbyListingsComponent;

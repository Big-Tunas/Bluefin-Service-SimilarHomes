import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// eslint-disable-next-line import/extensions
import SimilarListingsContainer from './SimilarListingsContainer.jsx';

class NearbyListingsContainer extends React.Component {
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
    axios.get('http://localhost:4004/image')
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
      grid-template-columns: repeat(${listings.length}, 297px);
      grid-template-rows: 1fr;
      width: 616px;
      overflow-y: none;
      overflow-x: scroll;
      scroll-snap-type: inline mandatory;
    `;

    const ScrollingContainer = styled.div`
      height: 400px;
    `;

    const output = (
      <div id="section-title">
        <h2 style={{ 'font-family': '"Libre Franklin", sans-serif' }}>Nearby Similar Homes</h2>
        <ScrollingContainer>
          <ScrollingComponent className="similar-listings">
            {containers}
          </ScrollingComponent>
        </ScrollingContainer>
      </div>
    );
    return output;
  }
}

export default NearbyListingsContainer;

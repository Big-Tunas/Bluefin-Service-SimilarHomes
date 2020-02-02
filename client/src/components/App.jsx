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
      grid-template-columns: repeat(${listings.length}, 356px);
      grid-template-rows: 1fr;
      width: 732px;
      height: 400px;
      overflow-y: none;
      overflow-x: scroll;
      scroll-snap-type: inline mandatory;
    `;

    const ScrollingContainer = styled.div`
      height: 100%;
      position: relative;
      width: 100%
      overflow-y: none;
    `;

    const ArrowContainer = styled.div`
      position: relative;
      display: inline-block;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: white;
      border: 1px solid grey;
    `;

    const output = (
      <div id="section-title">
        <h2 style={{ 'font-family': '"Libre Franklin", sans-serif' }}>Nearby Similar Homes</h2>
        <ArrowContainer position="previous" />
        <ArrowContainer position="next" />
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

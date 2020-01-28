import React from 'react';
import ListingImage from './ListingImage.jsx';
import styled from 'styled-components';
import axios from 'axios';

class NearbyListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    }
  }

  getListings() {
    axios.get('http://localhost:4004/image')
      .then(listings => {
          this.setState({
            listings: listings.data
          });
      });
  }

  componentDidMount() {
    if (!this.state.listings.length) {
      this.getListings();
    }
  }


  render() {
    if (!this.state.listings.length) {
      return (
        <div>
          <ListingImage src="https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg" />
        </div>
      );
    } else {
      let homes = this.state.listings;
      let images = homes.map(listing => {
        return (<ListingImage src={listing.imageUrl} />);
      });
      return (
        <div>
          {images}
        </div>
      );
    }

  }
};

export default NearbyListingsContainer;
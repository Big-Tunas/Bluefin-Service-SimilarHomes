import React from 'react';
import axios from 'axios';

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
    let output;
    if (!{ listings }.length) {
      output = (
        <div className="similar-listings-container">
          Error rendering listings
        </div>
      );
    } else {
      const containers = listings.map((l) => <SimilarListingsContainer data={l} />);
      output = (
        <div className="similar-listings-container">
          {containers}
        </div>
      );
    }
    return output;
  }
}

export default NearbyListingsContainer;

import React from 'react';
import ReactDOM from 'react-dom';
import Listing from './components/App.jsx';
import axios from 'axios';

// Get random listing from database first
// then pass listing object into Listing component

// axios.get('http://localhost:4004/listings/random', (req, res) => {
//   ReactDOM.render(<Listing listing={res.data}/>, document.getElementById('app'));
// });

ReactDOM.render(<Listing />, document.getElementById('app'));
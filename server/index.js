// const aws = require('./aws.js');
const express = require('express');
const db = require('../database/index.js');

const mainApp = express();
const mainPort = 4004;

mainApp.use(express.static('public'));
mainApp.use(express.json());
mainApp.use(express.urlencoded({ extended: true }));


mainApp.get('/listings', (req, res) => {
  db.listingRetrieval((err, listings) => {
    if (err) {
      res.status(400);
      res.end(err);
    } else {
      res.status(200);
      res.writeHead({ 'Access-Control-Allow-Origin': 'http://localhost/3000' });
      res.send(listings);
    }
  });
});

mainApp.listen(mainPort, () => {
  // eslint-disable-next-line no-console
  console.log(`Main App is listening on port ${mainPort}, only use to serve up static HTML files.`);
});

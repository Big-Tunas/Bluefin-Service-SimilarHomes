// const aws = require('./aws.js');
const express = require('express');
const mainApp = express();
const mainPort = 4004;

mainApp.use(express.static('public'));
mainApp.use(express.json());
mainApp.use(express.urlencoded({extended: true}));


mainApp.get('/image', (req, res) => {
  console.log(req.body);
});

mainApp.listen(mainPort, () => {
  console.log(`Main App is listening on port ${mainPort}, only use to serve up static HTML files.`);
});

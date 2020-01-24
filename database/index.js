const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const conn = mongoose.createConnection('mongodb://localhost/listings');
const Schema = mongoose.Schema;

conn.dropCollection('listings');

let listingSchema = new Schema({
  listingId: Number,
  image: String,
  price: Number,
  beds: Number,
  baths: Number,
  squareFootage: Number,
  streetAddress: {
    addressLineOne: String,
    addressLineTwo: String,
    city: String,
    state: String,
    zip: String,
  },
  notableFeatures: [String],
  hotHome: Boolean,
  nextOpenHouse: {
    dayOfWeek: String,
    startingTime: String,
    endingTime: String
  }
});

// TO-DO: method to search for similar listings in Listings collection
// listingSchema.methods.findSimilarListings = (listingId, cb) => {

// };

var Listing = mongoose.model('Listing', listingSchema);

// Pseudodata used for seeding

// Helper method to pull a random listing from an array of data

let randomData = (arr) => (
  arr[Math.round(Math.random() * arr.length)]
);

// Images pulled
let listOfImages = [
  'https://media.architecturaldigest.com/photos/5601b15b5a2d8a2712e8979b/master/w_1600%2Cc_limit/uk-modern-houses-book03.jpg',
  'https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg',
  'https://i.pinimg.com/originals/2b/fb/6b/2bfb6b646097abbc26d218b78370c5c9.jpg',
  'https://i1.wp.com/www10.aeccafe.com/blogs/arch-showcase/files/2018/09/1.1-min.jpg?w=1000&ssl=1',
  'https://www.cupapizarras.com/wp-content/uploads/2018/09/casa-pasiva-contemporanea-asturias.jpg'
];

let pickImage = () => (
  randomData(listOfImages)
);

// Home features to be included in notableFeatures; 1 <= notablesFeatures.length <= 3
let features = [
  'Yard',
  'Garage',
  'Fireplace',
  'Central Air',
  'Hardwood Floor',
  'Low Street Noise',
  'Fixer-Upper',
  'Pool'
];

let pickFeatures = () => {
  let output = [];
  let size = Math.round(Math.random() * 2) + 1

  while (output.length < size) {
    output.push(randomData(features));
  }

  return output;
};

let hotOrNot = () => {
  if (Math.random() < .5) {
    return false;
  } else {
    return true;
  }
};

// Open house information - just populating with predetermined strings and made as two-hour or all-day (9AM - 5PM) blocks
let openHouseDay = [
  'Sat',
  'Sun'
];

let openHouseTimes = [
  '9AM', '9:30AM',
  '10AM', '10:30AM',
  '11:0AM', '11:30AM',
  '12PM', '12:30PM',
  '1PM', '1:30PM',
  '2PM', '2:30PM',
  '3PM', '3:30PM',
  '4PM', '4:30PM',
  '5PM', '5:30PM',
  '6PM', '6:30PM',
  '7PM'
];

let setOpenHouse = () => {
  // Select a random time slot from openHouseTimes and openHouseDay
  // Returns an array containing [day, startTime, endTime]
  // May assign a 2-hr block or an all-day open house (9AM - 5PM)
  let details = {};
  details.dayOfWeek = randomData(openHouseDay);

  let coinFlip = Math.random();

  if (coinFlip < 0.8) {
    // select random 2-hr block
    let index = Math.round(Math.random() * 16);
    details.startingTime = openHouseTimes[index];
    details.endingTime = openHouseTimes[index + 4];
  } else {
    // set all-day block
    details.startingTime = openHouseTimes[0];
    details.endingTime = openHouseTimes[16];
  }

  return details;
};

// Address information
// let streetAddresses = [
//   ['4633 Gaviota Court', ''],
//   ['2149 Holbrook Drive', ''],
//   ['2420 College Avenue', 'Apt 123'],
//   ['1234 Hardknock Way', 'Apt 987'],
//   ['4023 San Gorgonio', ''],
//   ['45678 Austin Boulevard', '']
// ];

// let citiesAndStates = [
//   ['San Francisco', 'CA'],
//   ['Seattle', 'WA'],
//   ['Brooklyn', 'NY'],
//   ['Houston', 'TX'],
//   ['Chicago', 'IL']
// ];

// let writeZip = () => {
//   let zip = '';
//   while (zip.length < 5) {
//     zip = zip.concat(Math.floor(Math.random() * 9));
//   }
//   return zip;
// };

// weighted towards homes over apartments
let writeFullAddress = () => {
  let coinFlip = Math.round(Math.random() + 0.3);

  if (coinFlip) {
    return {
      addressLineOne: faker.address.streetAddress(),
      addressLineTwo: null,
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode()
    };
  } else {
    return {
      addressLineOne: faker.address.streetAddress(),
      addressLineTwo: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode()
    };
  }
};

// Property information

let generateId = () => (
  Math.round(Math.random() * 88888888) + 10000000
);

let countBeds = () => (
  Math.ceil(Math.random() * 5) + 1
);

let countBaths = () => (
  (Math.random() < .5) ? Math.ceil(Math.random() * 5) + 1 : Math.ceil(Math.random() * 5) + 0.5
);

let setPrice = () => (
  Math.ceil((Math.random() * 2250000) % 1000) * 1000 + 700000
);

let setSize = () => (
  Math.ceil(Math.random() * 3000) + 450
);

// Helper function to generate object to be inserted to db

let listingGenerator = () => {
  return {
    listingId: generateId(),
    imageUrl: pickImage()
    price: setPrice(),
    beds: countBeds(),
    baths: countBaths(),
    squareFootage: setSize(),
    streetAddress: writeFullAddress(),
    notableFeatures: pickFeatures(),
    hotHome: hotOrNot(),
    nextOpenHouse: setOpenHouse()
  };
};

let randomListings = [];

while (randomListings.length < 100) {
  randomListings.push(new Listing(listingGenerator()));
}

Listing.insertMany(randomListings, (err, docs) => {
  if (err) {
    console.log(err);
  }
  console.log('The following documents have been saved:');
  console.log(docs);
});

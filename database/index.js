const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/listings', { useNewUrlParser: true, useUnifiedTopology: true });
// , (err, db) => {
//   if (err) {
//     console.log('Error connecting to mongo');
//   } else {
//     db.collection('listings').drop((err, OK) => {
//       if (err) {
//         console.log('Error dropping listings: ' + err);
//       } else {
//         console.log('Success dropping listings');
//       }
//       return;
//     })
//   }
// });

const { Schema } = mongoose;

const listingSchema = new Schema({
  listingId: Number,
  imageUrl: String,
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
    endingTime: String,
  },
});

// TO-DO: method to search for similar listings in Listings collection
// listingSchema.methods.findSimilarListings = (listingId, cb) => {

// };

const Listing = mongoose.model('Listing', listingSchema);

// Pseudodata used for seeding

// Helper method to pull a random listing from an array of data

const randomData = (arr) => (
  arr[Math.floor(Math.random() * arr.length)]
);

// Images pulled
const listOfImages = [
  'https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg',
  'https://i.pinimg.com/originals/2b/fb/6b/2bfb6b646097abbc26d218b78370c5c9.jpg',
  'https://i1.wp.com/www10.aeccafe.com/blogs/arch-showcase/files/2018/09/1.1-min.jpg?w=1000&ssl=1',
  'https://www.cupapizarras.com/wp-content/uploads/2018/09/casa-pasiva-contemporanea-asturias.jpg',
];

const pickImage = () => (
  randomData(listOfImages)
);

// Home features to be included in notableFeatures; 1 <= notablesFeatures.length <= 3
const features = [
  'Yard',
  'Garage',
  'Fireplace',
  'Central Air',
  'Hardwood Floor',
  'Low Street Noise',
  'Fixer-Upper',
  'Pool',
];

const pickFeatures = () => {
  const output = [];
  const size = Math.round(Math.random() * 2) + 1;

  while (output.length < size) {
    const feature = randomData(features);
    if (!output.includes(feature)) {
      output.push(feature);
    }
  }

  return output;
};

const hotOrNot = () => {
  if (Math.random() < 0.5) {
    return false;
  }
  return true;
};

// Open house information - just populating with predetermined strings and made
// as two-hour or all-day (9AM - 5PM) blocks
const openHouseDay = [
  'Sat',
  'Sun',
];

const openHouseTimes = [
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
  '7PM',
];

const setOpenHouse = () => {
  // Select a random time slot from openHouseTimes and openHouseDay
  // Returns an array containing [day, startTime, endTime]
  // May assign a 2-hr block or an all-day open house (9AM - 5PM)
  const details = {};
  details.dayOfWeek = randomData(openHouseDay);

  const coinFlip = Math.random();

  if (coinFlip < 0.8) {
    // select random 2-hr block
    const index = Math.round(Math.random() * 16);
    details.startingTime = openHouseTimes[index];
    details.endingTime = openHouseTimes[index + 4];
  } else {
    // set all-day block
    [details.startingTime,,,,,,,,,,,,,,,, details.endingTime] = openHouseTimes;
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
const writeFullAddress = () => {
  const coinFlip = Math.round(Math.random() + 0.3);

  if (coinFlip) {
    return {
      addressLineOne: faker.address.streetAddress(),
      addressLineTwo: null,
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
    };
  }
  return {
    addressLineOne: faker.address.streetAddress(),
    addressLineTwo: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
  };
};

// Property information

const generateId = () => (
  Math.round(Math.random() * 88888888) + 10000000
);

const countBeds = () => (
  Math.ceil(Math.random() * 6)
);

const countBaths = () => (
  (Math.random() < 0.5) ? Math.ceil(Math.random() * 5) + 1 : Math.ceil(Math.random() * 5) + 0.5
);

const setPrice = () => (
  Math.ceil((Math.random() * 2250000) % 1000) * 1000 + 700000
);

const setSize = () => (
  Math.ceil(Math.random() * 3000) + 450
);

// Helper function to generate object to be inserted to db

const listingGenerator = () => ({
  listingId: generateId(),
  imageUrl: pickImage(),
  price: setPrice(),
  beds: countBeds(),
  baths: countBaths(),
  squareFootage: setSize(),
  streetAddress: writeFullAddress(),
  notableFeatures: pickFeatures(),
  hotHome: hotOrNot(),
  nextOpenHouse: setOpenHouse(),
});

const listingCount = new Promise((res, rej) => {
  Listing.countDocuments((err, count) => {
    if (err) {
      rej(err);
    } else {
      res(count);
    }
  });
});

listingCount.then((count) => {
  const randomListings = [];
  let docs = count;
  if (count < 100) {
    while (docs < 100) {
      randomListings.push(new Listing(listingGenerator()));
      docs += 1;
    }
    return randomListings;
  }
  return randomListings;
})
  .then((arr) => {
    if (arr.length) {
      Listing.insertMany(arr, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
        // eslint-disable-next-line no-console
        console.log('The documents have been saved');
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('DB is already fully seeded');
    }
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });


const listingRetrieval = (cb) => {
  // eslint-disable-next-line no-console
  console.log('Searching DB for listings');

  const listings = new Promise((res, rej) => {
    // eslint-disable-next-line array-callback-return
    Listing.find((err, arr) => {
      if (err) {
        rej(err);
      } else {
        res(arr);
      }
    });
  });

  listings.then((results) => {
    const docs = [];
    while (docs.length < 9) {
      docs.push(results[Math.floor(Math.random() * results.length)]);
    }
    return docs;
  })
    .then((arr) => {
      cb(null, arr);
    })
    .catch((err) => {
      cb(err);
    });
};

module.exports = {
  listingRetrieval,
};

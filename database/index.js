const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listingSchema = new Schema({
  listingId: Number,
  listingDetails: {
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    squareFootage: Number,
    streetAddress: {
      addressLineOne: String,
      addressLineTwo: String,
      city: String,
      state: String,
      zip: Number,
    },
  },
  tags: {
    notableFeatures: [String],
    hotHome: Boolean,
    nextOpenHouse: {
      startingTime: Date,
      endingTime: Date
    }
  }
});

listingSchema.methods.findSimilarListings = (listingId, cb) => {
  // let details =
};

var Listing = mongoose.model('Listing', listingSchema);




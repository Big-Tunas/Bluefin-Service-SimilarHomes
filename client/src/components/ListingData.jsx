/* eslint-disable react/prop-types */
import React from 'react';

const ListingData = ({ info }) => {
  const {
    price,
    beds,
    baths,
    squareFootage: area,
    notableFeatures: features,
    streetAddress: address,
  } = info;

  const addressBuilder = (obj) => {
    if (obj.addressLineTwo) {
      return `${obj.addressLineOne} ${obj.addressLineTwo}, ${obj.city}, ${obj.state} ${obj.zip}`;
    }
    return `${obj.addressLineOne}, ${obj.city}, ${obj.state} ${obj.zip}`;
  };

  const priceString = (num) => {
    const digits = num.toString().split('');
    const priceChars = [];
    let chunkCount = 0;
    for (let i = digits.length - 1; i > -1; i += -1) {
      chunkCount += 1;
      if (chunkCount % 3 === 0) {
        if (i !== 0) {
          priceChars.unshift(`,${digits[i]}`);
          chunkCount = 0;
        } else {
          priceChars.unshift(`$${digits[i]}`);
        }
      } else if (chunkCount % 3 !== 0) {
        if (i !== 0) {
          priceChars.unshift(digits[i]);
        } else {
          priceChars.unshift(`$${digits[i]}`);
        }
      }
    }
    return priceChars.join('');
  };

  const bedString = (num) => {
    if (num === 1) {
      return `${num} Bed`;
    }
    return `${num} Beds`;
  };

  const bathString = (num) => {
    if (num === 1) {
      return `${num} Bath`;
    }
    return `${num} Baths`;
  };

  const areaString = (num) => {
    if (!num) {
      return '- Sq. Ft.';
    }
    const digits = num.toString().split('');
    const areaStr = [];
    let chunkCount = 0;
    for (let i = digits.length - 1; i > -1; i += -1) {
      chunkCount += 1;
      if (chunkCount % 3 === 0) {
        if (i !== 0) {
          areaStr.unshift(`,${digits[i]}`);
          chunkCount = 0;
        } else {
          areaStr.unshift(digits[i]);
        }
      } else {
        areaStr.unshift(digits[i]);
      }
    }
    return `${areaStr.join('')} Sq. Ft.`;
  };

  const tagBuilder = (arr) => (
    arr.map((tag) => <div className="tag">{tag}</div>)
  );

  return (
    <div className="listingData">
      <div className="price">
        {priceString(price)}
      </div>
      <div className="listing-details">
        <span className="listing-detail beds">
          {bedString(beds)}
        </span>
        <span className="listing-detail baths">
          {bathString(baths)}
        </span>
        <span className="listing-detail area">
          {areaString(area)}
        </span>
      </div>
      <div className="address">
        {addressBuilder(address)}
      </div>
      <div className="tagsContainer">
        {tagBuilder(features)}
      </div>
    </div>
  );
};

export default ListingData;

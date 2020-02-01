/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ListingData = ({ info }) => {
  const DataDiv = styled.div`
    position: relative;
    padding: 1rem;
    background-color: #fff;
    color: #333;
    font-family: "Libre Franklin", sans-serif;
    height: 148px;
  `;

  const FeatureSpan = styled.span`
    display: inline-block;
    font-size: 12px;
    border-radius: 14px;
    background-color: #f5f5f5;
    padding: .25rem .75rem;
    margin: 0;
    margin-top: 9px;
    margin-right: .375rem;
    margin-bottom: 5px;
  `;

  const PriceSpan = styled.span`
    font-size: 18px;
    padding: .5rem 0;
    margin: 0;
  `;

  const AddressSpan = styled.span`
    font-size: 12px;
    padding-bottom: 6px;
    width: 148px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const DetailsDiv = styled.div`
    margin: 0;
    padding: 12px 0 9px;
  `;

  const DetailSpan = styled.span`
    padding: 0 5px;
  `;

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
    arr.map((tag) => <FeatureSpan className="tag">{tag}</FeatureSpan>)
  );

  return (
    <DataDiv className="listingData">
      <PriceSpan className="price">
        {priceString(price)}
      </PriceSpan>
      <DetailsDiv className="listing-details">
        <DetailSpan className="listing-detail beds">
          {bedString(beds)}
        </DetailSpan>
        <DetailSpan className="listing-detail baths">
          {bathString(baths)}
        </DetailSpan>
        <DetailSpan className="listing-detail area">
          {areaString(area)}
        </DetailSpan>
      </DetailsDiv>
      <AddressSpan className="address">
        {addressBuilder(address)}
      </AddressSpan>
      <div className="tagsContainer">
        {tagBuilder(features)}
      </div>
    </DataDiv>
  );
};

export default ListingData;

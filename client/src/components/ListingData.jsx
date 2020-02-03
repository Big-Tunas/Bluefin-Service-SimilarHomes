/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import DataWrapper from './DataWrapper.jsx';

const ListingData = ({ info }) => {
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

  const AddressSpan = styled.div`
    font-size: .75rem;
    padding-bottom: 12px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `;

  const DetailsDiv = styled.div`
    margin: 0;
    padding: 12px 0 12px;
  `;

  const DetailSpan = styled.span`
    padding: 0 10px 0 0;
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
    <DataWrapper className="listingData">
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
    </DataWrapper>
  );
};

export default ListingData;

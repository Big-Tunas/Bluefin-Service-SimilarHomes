// const aws = require('aws-sdk');
// const config = require('./config.json');

// (async () => {
//   try {

//     aws.config.setPromisesDependency();
//     aws.config.update({
//       accesKeyId: config.aws.access,
//       secretAccessKey: config.aws.secret,
//       region: 'us-west-1'
//     });

//     const s3 = new aws.S3();

//     var res = await s3.listObjectsV2({
//       Bucket: 'big-tunas-similar-homes'
//     }).promise();

//     console.log(res);

//   } catch(e) {
//     console.log('Error in photo retrieval', e);
//   }
// })();

const axios = require('axios');
const crypto = require('crypto-js');
const config = require('./config.json');

const getDate = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  return [year, month, day].join('');
};

const getSignature = (key, dateStamp, regionName, serviceName) => {
  var kRegion = crypto.HmacSHA256(regionName, kDate);
  var kService = crypto.HmacSHA256(serviceName, kRegion);
  var kSigning = crypto.HmacSHA256("aws4_request", kService);
  return kSigning;
};

const getString = () => {
  return 'GET' + '\n' +
  ''
}

const Authorization = 'AWS ' + config.aws.access + ':' + getSignature(config.aws.secret, getDate()d, 'us-west-1', 's3');

axios({
  method: 'GET',
  url: '/?list-type=2 HTTP/1.1',
  headers: {
    HOST: 'https://big-tunas-similar-homes.s3.us-west-1.amazonaws.com',
    Authorization: 'AWS4-HMAC-SHA256' + '\n' +
    'Credential=' + config.aws.access + '/' + getDate() + '/us-west-1/s3/aws4_request,' + '\n' +
    'SignedHeaders=host;range;x-amz-date,' + '\n' +
    'Signature=' +
  }
})
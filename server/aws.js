const aws = require('aws-sdk');
const config = require('./config.json');

(async () => {
  try {

    aws.config.setPromisesDependency();
    aws.config.update({
      accesKeyId: config.aws.access,
      secretAccessKey: config.aws.secret,
      region: 'us-west-1'
    });

    const s3 = new aws.S3();

    var res = await s3.listObjectsV2({
      Bucket: 'big-tunas-similar-homes'
    }).promise();

    console.log(res);

  } catch(e) {
    console.log('Error in photo retrieval', e);
  }
})();
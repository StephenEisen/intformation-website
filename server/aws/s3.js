import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const imageDomain = process.env.IMAGES_DOMAIN || 'images.epic7.gg';

export const uploadImageToS3 = async (file, pageId, towerId, teamIndex) => {
  const fileName = Math.random().toString(36).slice(2);
  const filePath = `towers/${pageId}/${towerId}/${teamIndex}-${fileName}`;

  const params = {
    Bucket: imageDomain,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(`https://${imageDomain}/${filePath}`);
      }
    });
  });
}

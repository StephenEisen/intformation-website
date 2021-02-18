import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export const uploadImageToS3 = async (pageId, towerId, teamIndex, file) => {
  const filePath = `towers/${pageId}/${towerId}/${teamIndex}-${file.originalname}`;

  const params = {
    Bucket: 'images.epic7.gg',
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
        resolve(`http://images.epic7.gg/${filePath}`);
      }
    });
  });
}

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

export const getImagesFromS3 = async (pageId, towerId) => {
  const prefix = `towers/${pageId}/${towerId}`;

  const params = {
    Bucket: imageDomain,
    Prefix: prefix
  };

  return new Promise((resolve, reject) => {
    s3.listObjects(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(getLastModifiedImages(towerId, data.Contents));
      }
    });
  });
}

/** =============================================
 ** Helper functions
 ** ========================================== */
const getLastModifiedImages = (towerId, s3Objects) => {
  const images = Array(2).fill({});
  let imageFound = false;

  for (let i = 0; i < s3Objects.length; i++) {
    const imageData = s3Objects[i];
    const teamIndex = imageData.Key.split('/')[3].split('-')[0] - 1;
    const imagePath = `https://${imageDomain}/${imageData.Key}`;
    const lastModified = imageData.LastModified;

    if (!images[teamIndex].lastModified || lastModified > images[teamIndex].lastModified) {
      imageFound = true;
      images.splice(teamIndex, 1, { imagePath, lastModified });
    }
  }

  return imageFound ? { [towerId]: images.map((image) => image.imagePath) } : {};
}

import fs from 'fs';

const MNIST_NUMBER_ITEM_OFFSET = 4;
const MNIST_ROW_OF_ITEM_OFFSET = 8;
const MNIST_COL_OF_ITEM_OFFSET = 12;
const MNIST_IMG_CONTENT_OFFSET = 16;
const MNIST_LABEL_CONTENT_OFFSET = 8;

export default {
  loadData(imagesPath, labelsPath) {
    return Promise.all([
      new Promise((resolve, reject) => {
        fs.readFile(imagesPath, (err, fileBuffer) => {
          if (err) {
            reject(err);
          }
          const numOfItems = fileBuffer.readInt32BE(MNIST_NUMBER_ITEM_OFFSET);
          const numOfRows = fileBuffer.readInt32BE(MNIST_ROW_OF_ITEM_OFFSET);
          const numOfCols = fileBuffer.readInt32BE(MNIST_COL_OF_ITEM_OFFSET);
          const imagePixels = numOfRows * numOfCols;

          const pixelValues = [];

          for (let imagesCount = 0; imagesCount < numOfItems; imagesCount += 1) {
            const pixels = [];

            for (let i = 0; i < imagePixels; i += 1) {
              const pixel = fileBuffer.readUInt8(MNIST_IMG_CONTENT_OFFSET + imagesCount + i);
              pixels.push(pixel);
            }

            pixelValues.push(pixels);
          }

          resolve(pixelValues);
        });
      }),
      new Promise((resolve, reject) => {
        fs.readFile(labelsPath, (err, fileBuffer) => {
          if (err) {
            reject(err);
          }
          const numOfItems = fileBuffer.readInt32BE(MNIST_NUMBER_ITEM_OFFSET);
          const labels = [];

          for (let imagesCount = 0; imagesCount < numOfItems; imagesCount += 1) {
            const label = fileBuffer.readUInt8(MNIST_LABEL_CONTENT_OFFSET + imagesCount);
            labels.push(label);
          }

          resolve(labels);
        });
      })
    ])
      .then(([pixelsData, labelsData]) => {
        return pixelsData.map((pixels, index) => ({
          pixels,
          lable: labelsData[index]
        }));
      });
  },
};

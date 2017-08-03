import mnistDataLoaders from '../../src/dataLoaders/mnist';
import SVM from '../../samples/linnearcls/svm';

const svm = new SVM();

mnistDataLoaders.loadData(
  `${__dirname}/train-images-idx3-ubyte`,
  `${__dirname}/train-labels-idx1-ubyte`,
).then(([data, labels]) => {
  svm.train(data.slice(0,5), labels.slice(0,5));

  // mnistDataLoaders.loadData(
  //   `${__dirname}/t10k-images-idx3-ubyte`,
  //   `${__dirname}/t10k-labels-idx3-ubyte`,
  // ).then((data, labels) => {
  //   const testPredict = svm.predictd(data[0]);
  //   console.log(`Prediction for ${labels[0]}: ${testPredict}`);
  // });
}).catch(console.log);

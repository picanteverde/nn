import mnistDataLoaders from '../../src/dataLoaders/mnist';

mnistDataLoaders.loadData(
  `${__dirname}/train-images-idx3-ubyte`,
  `${__dirname}/train-labels-idx1-ubyte`,
).then(console.log);

import mnistDataLoaders from '../../src/dataLoaders/mnist';
import {
  genM,
  sumM,
  mulMS
} from '../../src/lib/matrixOperations';
import {
  R1,
  grad,
  SVM_loss
} from '../../src/lib/gd';
debugger; // eslint-disable-line

mnistDataLoaders.loadData(
  `${__dirname}/train-images-idx3-ubyte`,
  `${__dirname}/train-labels-idx1-ubyte`,
).then(([X, Y]) => {

  let steps = 1000;
  let learningRate = 0.03;
  let minibatchQuantity = 10;
  let minibatchSize = X.length /minibatchQuantity;
  let dW;
  let W = genM(10, X[0].length, i => j => Math.random());


  for (let i = 0; i < steps; i += 1){
    // let from = Math.floor(i/steps*minibatchQuantity) * minibatchSize;
    // let to = from + minibatchSize;
    // let miniBatchX = X.slice(from, to);
    // let miniBatchY = Y.slice(from, to);
    dW = grad(W, X, Y, SVM_loss(Y, R1, 0.1));
    W = sumM(W, mulMS(dW, -1 * learningRate));
  }

  console.log(JSON.toString(W));
  // mnistDataLoaders.loadData(
  //   `${__dirname}/t10k-images-idx3-ubyte`,
  //   `${__dirname}/t10k-labels-idx3-ubyte`,
  // ).then((data, labels) => {
  //   const testPredict = svm.predictd(data[0]);
  //   console.log(`Prediction for ${labels[0]}: ${testPredict}`);
  // });
}).catch(console.log);

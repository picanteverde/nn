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

import mnist from 'mnist';

mnistDataLoaders.loadData(
  `${__dirname}/train-images-idx3-ubyte`,
  `${__dirname}/train-labels-idx1-ubyte`,
).then(([X, Y]) => {

  const set = mnist.set(8000, 2000);
  X = set.training.map(t => t.input);
  Y = set.training.map(t => t.output.indexOf(1));

  let learningRate = 0.01;
  let minibatchQuantity = 100;
  let minibatchSize = X.length /minibatchQuantity;
  let dW;
  let W = genM(10, X[0].length, i => j => Math.random());

  setInterval(() => console.log(JSON.stringify(W)), 10000);

  let i = 0;
  const run = () => {
    let from = i * minibatchSize;
    let to = from + minibatchSize;
    let miniBatchX = X.slice(from, to);
    let miniBatchY = Y.slice(from, to);
    dW = grad(W, miniBatchX, miniBatchY, SVM_loss(miniBatchY, R1, 0.1));
    W = sumM(W, mulMS(dW, -1 * learningRate));
    i += 1;
    if (i >= minibatchQuantity) {
      i = 0;
    }
  };

  setInterval(run, 0);

  // mnistDataLoaders.loadData(
  //   `${__dirname}/t10k-images-idx3-ubyte`,
  //   `${__dirname}/t10k-labels-idx3-ubyte`,
  // ).then((data, labels) => {
  //   const testPredict = svm.predictd(data[0]);
  //   console.log(`Prediction for ${labels[0]}: ${testPredict}`);
  // });
}).catch(console.log);

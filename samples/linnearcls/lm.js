let dotV = (X, Y) => {
  let i, acc = 0, len = X.length;
  for (i = 0; i < len; i += 1) {
    acc += X[i] * Y[i];
  }
  return acc;
};

let dotM = (X, Y) => {
  let i, j,
    lenX = X.length,
    lenY = Y.length,
    acc = [];
  for (i = 0; i < lenY; i += 1) {
    let res = [];
    for (j = 0; j < lenX; j += 1) {
      res[j] = dotV(X[j], Y[i]);
    }
    acc[i] = res;
  }
  return acc;
};

let mulV = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] * Y[i];
  }
  return res;
};

let mulM = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = mulV(X[i], Y[i]);
  }
  return res;
};

let mulVS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] * S;
  }
  return res;
};

let mulMS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = mulVS(X[i], S);
  }
  return res;
};

let sumV = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] + Y[i];
  }
  return res;
};

let sumM = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = sumV(X[i], Y[i]);
  }
  return res;
};

let sumVS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] + S;
  }
  return res;
};

let sumMS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = sumVS(X[i], S);
  }
  return res;
};

let sumRV = (X) => {
  let i, res = 0, len = X.length;
  for (i = 0; i < len; i += 1) {
    res += X[i];
  }
  return res;
};

let sumRM = (X) => {
  let i, res = 0, len = X.length;
  for (i = 0; i < len; i += 1) {
    res += sumRV(X[i]);
  }
  return res;
};

let genV = (l, func) => {
  let i, res = [];
  for (i = 0; i < l; i += 1) {
    res[i] = func(i);
  }
  return res;
};

let genM = (l, l2, func) => {
  let i, res = [];
  for (i = 0; i < l; i += 1) {
    res[i] = genV(l2, func(i));
  }
  return res;
};

let showV = (X) => X.map(x => x.toFixed(2)).join(' ');

let showM = (X) => X.map(showV).join('\n');

const trainingSize = 5;
const classes = 3;
const evidences = 4;
const lambda = 0.1;
const learningRate = 0.03;
const steps = 50;

const r = (W) => sumRM(mulM(W, W));

let W = genM(classes, evidences, i => j => Math.random());

let X = genM(trainingSize, evidences, i => j => Math.random());

let Y = genV(trainingSize, i => parseInt(Math.random() * classes, 10));

let S, M, Yi, L, data_loss, dW;



for (let i = 0; i < steps; i += 1){

  S = dotM(W, X);

  M = S.map((Si, i) => (Yi = Y[i], Si.map((s,j) => Yi === j ? 0: Math.max(0, s - Si[Y[i]] + 1))));


  L = M.map(Mi => sumRV(Mi));

  data_loss = (sumRV(L) / trainingSize) + lambda * r(W);

  console.log('total loss:' + data_loss);

  M = M.map(Mi => Mi.map(m => (m > 0 ? 1 : 0)));


  let dW = genM(classes, evidences, i => j => 0);

  M.map((Mi, i) =>
    Mi.map((x, j)=>
      (dW[j] = sumV(
        dW[j],
        j === Y[i] ?
          mulVS(X[i], sumRV(M[i]) * -1):
          mulVS(X[i], M[i][j])
      ))
    )
  );


  dW = mulMS(dW, 1/trainingSize);

  W = sumM(W, mulMS(dW, -1 * learningRate));
}

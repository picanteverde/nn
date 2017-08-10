import {
  sumRV,
  sumRM,
  dotM,
  genM,
  sumV,
  mulVS,
  mulMS,
  mulM
} from './matrixOperations';

export const R1 = (W) => sumRM(mulM(W, W));

export const grad = (W, X, Y, loss) => {
  const S = dotM(W, X);
  const gradFn = loss(S, W);
  return gradFn(X, W.length);
};

export const SVM_loss = (Y, R, lambda) => (S, W) => {
  let Yi;
  const M = S.map((Si, i) => (Yi = Y[i], Si.map((s,j) => Yi === j ? 0: Math.max(0, s - Si[Y[i]] + 1))));
  const L = M.map(Mi => sumRV(Mi));

  const data_loss = (sumRV(L) / S.length) + lambda * R(W);

  console.log('total loss:' + data_loss);

  const C = M.map(Mi => Mi.map(m => (m > 0 ? 1 : 0)));
  return (X, classes) => {
    let dW = genM(classes, X[0].length, i => j => 0);
    C.map((Ci, i) =>
      Ci.map((x, j)=>
        (dW[j] = sumV(
          dW[j],
          j === Y[i] ?
            mulVS(X[i], sumRV(C[i]) * -1):
            mulVS(X[i], C[i][j])
        ))
      )
    );
    dW = mulMS(dW, 1/X.length);
    return dW;
  };
};

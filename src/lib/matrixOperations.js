export const dotV = (X, Y) => {
  let i, acc = 0, len = X.length;
  for (i = 0; i < len; i += 1) {
    acc += X[i] * Y[i];
  }
  return acc;
};

export const dotM = (X, Y) => {
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

export const mulV = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] * Y[i];
  }
  return res;
};

export const mulM = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = mulV(X[i], Y[i]);
  }
  return res;
};

export const mulVS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] * S;
  }
  return res;
};

export const mulMS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = mulVS(X[i], S);
  }
  return res;
};

export const sumV = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] + Y[i];
  }
  return res;
};

export const sumM = (X, Y) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = sumV(X[i], Y[i]);
  }
  return res;
};

export const sumVS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = X[i] + S;
  }
  return res;
};

export const sumMS = (X, S) => {
  let i, res = [], len = X.length;
  for (i = 0; i < len; i += 1) {
    res[i] = sumVS(X[i], S);
  }
  return res;
};

export const sumRV = (X) => {
  let i, res = 0, len = X.length;
  for (i = 0; i < len; i += 1) {
    res += X[i];
  }
  return res;
};

export const sumRM = (X) => {
  let i, res = 0, len = X.length;
  for (i = 0; i < len; i += 1) {
    res += sumRV(X[i]);
  }
  return res;
};

export const genV = (l, func) => {
  let i, res = [];
  for (i = 0; i < l; i += 1) {
    res[i] = func(i);
  }
  return res;
};

export const genM = (l, l2, func) => {
  let i, res = [];
  for (i = 0; i < l; i += 1) {
    res[i] = genV(l2, func(i));
  }
  return res;
};


export const showV = (X) => X.map(x => x.toFixed(2)).join(' ');

export const showM = (X) => X.map(showV).join('\n');

import nj from 'numjs';

//linnear classifier 2d

const scores = (W, x) => nj.dot(W, x);
const Li = (S, c) =>
  S.reduce((acc, elm) =>
    acc + Math.max(0, S[c] - elm + 1) ,0
  ) - 1;

const trainingSize = 10;
const classes = 4;
const evidences = 4;



const W = nj.random([classes, evidences]);

W.__proto__.map = function(fn){ return this.selection.data.map(fn);};
W.__proto__.mapDimension = function(dimRemove, fn){
  const slice = [];
  const args = Array.from(new Array(this.shape.length), () => null);
  args[dimRemove] = slice;
  for(var i =0; i < this.shape[dimRemove]; i += 1){
    slice[0] = i;
    slice[1] = i + 1;
    fn(this.slice.apply(this,args), i);
  }
};
W.__proto__.reduceDimension = function(dimRemove, fn, acc){
  let ret = acc;
  this.mapDimension(dimRemove, (S, i) => {
    ret = fn(ret, S, i);
  });
  return ret;
};

const X = nj.random([evidences,trainingSize]);

// generate classes for training data
const Y = nj.array(Array.from(new Array(trainingSize), () => parseInt(Math.random() * classes),10));

const S = scores(W,X);

X0 = X.slice(null,[0,1]).toString();

scores(W,X.slice(null,[0,1]).reshape(4));

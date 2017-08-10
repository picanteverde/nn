import nj from 'numjs';

//linnear classifier 2d

const scores = (W, x) => nj.dot(W, x);


const trainingSize = 5;
const classes = 3;
const evidences = 4;
const lambda = 0.1;
const learningRate = -0.03;

const Ones = nj.ones([classes, evidences]);
const Twos = Ones.add(Ones);

const r = (W) => W.pow(Twos).sum();

let W = nj.random([classes, evidences]);


//* Fix numjs for maping over a dimmension
W.__proto__.mapDimension = function(dimRemove, fn){
  const slice = [];
  const args = Array.from(new Array(this.shape.length), () => null);
  args[dimRemove] = slice;
  for(let i =0; i < this.shape[dimRemove]; i += 1){
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

//* Fix end

let X = nj.random([evidences,trainingSize]);

// generate classes for training data
let Y = nj.array(Array.from(new Array(trainingSize), () => parseInt(Math.random() * classes),10));


let S, margins, Li, data_loss, dW;
for (let vicky = 0; vicky < 50; vicky += 1){

  S = scores(W,X);

  margins = nj.zeros([classes, trainingSize]);


  S.mapDimension(1, (Si,i) => {
    for(let j = 0; j < Si.size; j += 1){
      margins.set(j, i, Math.max(0, Si.get(j,0) - Si.get(Y.get(i),0) + 1));
    }
    margins.set(Y.get(i),i, 0);
  });


  Li = [];

  margins.mapDimension(1, (Mi,i) => Li[i] = Mi.sum());

  data_loss = (Li.reduce((acc, m)=> acc + m ,0) / trainingSize) + lambda * r(W);

  console.log('total loss:' + data_loss);

  margins.selection.data = margins.selection.data.map((e) => ((e > 0) ? 1 : 0));


  dW = nj.zeros([classes, evidences]);

  margins.mapDimension(1, (Mi, i) => {
    for(let j = 0; j < Mi.size; j += 1){
      if( j === Y.get(i)) {
        let sum = Mi.sum() * -1;
        for (let k = 0; k < evidences; k += 1) {
          dW.set(j, k, dW.get(j, k) + (sum * X.get(k,i)) );
        }
      } else {
        for (let k = 0; k < evidences; k += 1) {
          dW.set(j, k, dW.get(j, k) + (Mi.get(j, 0) * X.get(k,i)) );
        }
      }
    }
  });


  dW = dW.divide(trainingSize);

  W = W.add(dW.multiply(learningRate));
}

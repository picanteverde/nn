import nj from 'numjs';

//linnear classifier 2d



const scores = (W, x) => nj.dot(W, x);


const trainingSize = 10;
const classes = 4;
const evidences = 4;
const lambda = 0.1;

const Ones = nj.ones([classes, evidences]);
const Twos = Ones.add(Ones);

const r = (W) => W.pow(Twos).sum();

const W = nj.random([classes, evidences]);

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

const X = nj.random([evidences,trainingSize]);

// generate classes for training data
const Y = nj.array(Array.from(new Array(trainingSize), () => parseInt(Math.random() * classes),10));

const S = scores(W,X);

const margins = nj.zeros([classes, trainingSize]);

S.mapDimension(1, (Si,i) => {
  for(let j = 0; j < Si.size; j += 1){
    margins.set(j, i, Math.max(0, Si.get(j,0) - Si.get(Y.get(i),0) + 1));
  }
  margins.set(Y.get(i),i, 0);
});


const Li = [];

margins.mapDimension(1, (Mi,i) => Li[i] = Mi.sum() - 1);

const data_loss = (Li.reduce((acc, m)=> acc + m ,0) / trainingSize) + lambda * r(W);


margins.selection.data = margins.selection.data.map((e) => ((e > 0) ? 1 : 0));

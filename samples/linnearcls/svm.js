import nj from 'numjs';

const getScores = (W, x) => nj.dot(W, x);

export default class SVM {
  constructor() {
    this.lambda = 0.1;
  }
  train(data, labels) {
    const trainingSize = data.length;
    const classes = labels.filter((value, idx) => idx==labels.lastIndexOf(value));
    const dataLen = data[0].length;

    this.W = this.W || nj.random([classes.length, dataLen]);

    const loss = data.reduce((loss, entry, idx) => {
      const scores = getScores(this.W, nj.array(entry).reshape(dataLen, 1)).tolist();
      const correctClassIdx = classes.indexOf(labels[idx]);
      //TODO Fix scores is an array of array due reshape to (dataLen, 1)
      return loss + scores.reduce(
        (acum, score, idx) =>
          (acum + (idx === correctClassIdx ? 0 : Math.max(0, score[0] - scores[correctClassIdx][0] + 1))),
        0
      );
    }, 0) / trainingSize;
    const regularization = 0;
    const L = loss + regularization;

    console.log(L);
  }
  predict(data) {

  }
}

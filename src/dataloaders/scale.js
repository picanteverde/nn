const classRegEx = /^(\d+)\s{1}/g;
const evidenceRegEx = /\s{1}(\d+):([-.\d]+)/g;

export default (line) => {
  classRegEx.lastIndex = 0;
  evidenceRegEx.lastIndex = 0;
  const cls = classRegEx.exec(line);
  const X = [];
  let match;

  while(match = evidenceRegEx.exec(line)) { // eslint-disable-line no-cond-assign
    X.push(match[2]);
  }
  return {
    Y: +cls[1],
    X,
  };
};

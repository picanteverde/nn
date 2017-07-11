import nj from 'numjs';

const a = nj.array([[1,2,3], [4,5,6]]);
const b = nj.array([2,3,4]);

console.log(nj.dot(a, b));

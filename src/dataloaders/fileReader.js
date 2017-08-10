import readLine from 'readline';
import fs from 'fs';

export default (lineParser) => (filename, cb) => {
  const lineReader = readLine.createInterface({
    input: fs.createReadStream(filename, 'utf8'),
  });
  const res = {
    X: [],
    Y: [],
  };

  lineReader.on('line', (line) => {
    const ret = lineParser(line);
    res.X.push(ret.X);
    res.Y.push(ret.Y);
  });

  lineReader.on('close', () => {
    cb(res);
  });
};

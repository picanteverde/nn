import fr from '../../src/dataloaders/fileReader';
import lineParser from '../../src/dataloaders/scale';


const scaleReader = fr(lineParser);

scaleReader('./datasets/wine/wine.scale', (res) => {
  console.log('done: ', JSON.stringify(res));
});

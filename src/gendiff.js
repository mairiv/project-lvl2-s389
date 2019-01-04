import fs from 'fs';
import _ from 'lodash/fp';

const getConfigObj = (filePath) => {
  const jsonStr = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonStr);
};

const findDiff = (beforeConfig, afterConfig) => {
  const unicKeys = _.union(Object.keys(beforeConfig), Object.keys(afterConfig));

  const result = unicKeys.reduce((acc, el) => {
    let resStep = acc;
    if (beforeConfig[el] === afterConfig[el]) {
      resStep += `\n   ${el}: ${beforeConfig[el]}`;
    } else {
      if (_.has(el)(beforeConfig)) {
        resStep += `\n - ${el}: ${beforeConfig[el]}`;
      }
      if (_.has(el)(afterConfig)) {
        resStep += `\n + ${el}: ${afterConfig[el]}`;
      }
    }
    return resStep;
  }, '');

  return result;
};

const generateDiff = (firstPath, secondPath) => {
  const firstConfig = getConfigObj(firstPath);
  const secondConfig = getConfigObj(secondPath);
  const diffString = findDiff(firstConfig, secondConfig);
  console.log(diffString);
  return diffString;
};

export default generateDiff;

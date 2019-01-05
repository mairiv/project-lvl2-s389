import _ from 'lodash/fp';
import parseFile from './parser';

const findDiff = (beforeConfig, afterConfig) => {
  const unicKeys = _.union(Object.keys(beforeConfig), Object.keys(afterConfig));

  const result = unicKeys.reduce((acc, el) => {
    const resStep = acc;
    if (beforeConfig[el] === afterConfig[el]) {
      resStep.push(`\n   ${el}: ${beforeConfig[el]}`);
    } else {
      if (_.has(el)(beforeConfig)) {
        resStep.push(`\n - ${el}: ${beforeConfig[el]}`);
      }
      if (_.has(el)(afterConfig)) {
        resStep.push(`\n + ${el}: ${afterConfig[el]}`);
      }
    }
    return resStep;
  }, []);
  return result.join('');
};

const genDiff = (firstPath, secondPath) => {
  const firstConfig = parseFile(firstPath);
  const secondConfig = parseFile(secondPath);
  const diffString = findDiff(firstConfig, secondConfig);
  return diffString;
};

export default genDiff;

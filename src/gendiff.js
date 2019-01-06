import _ from 'lodash/fp';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';

const findDiff = (beforeConfig, afterConfig) => {
  const unicKeys = _.union(Object.keys(beforeConfig), Object.keys(afterConfig));
  const result = unicKeys.map((el) => {
    const hasKeyBefore = _.has(el)(beforeConfig);
    const hasKeyAfter = _.has(el)(afterConfig);

    if (hasKeyBefore && hasKeyAfter) {
      if (beforeConfig[el] === afterConfig[el]) {
        return `   ${el}: ${beforeConfig[el]}`;
      }
      return [` - ${el}: ${beforeConfig[el]}`, ` + ${el}: ${afterConfig[el]}`];
    }
    return ` ${hasKeyBefore ? '-' : '+'} ${el}: ${hasKeyBefore ? beforeConfig[el] : afterConfig[el]}`;
  });
  return _.flatten(result).join('\n');
};

const getConfig = filePath => parseData(fs.readFileSync(filePath, 'utf8'), path.extname(filePath).slice(1));

const genDiff = (firstPath, secondPath) => {
  const firstConfig = getConfig(firstPath);
  const secondConfig = getConfig(secondPath);
  const diff = findDiff(firstConfig, secondConfig);
  return diff;
};

export default genDiff;

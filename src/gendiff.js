import _ from 'lodash/fp';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';

const findDiff = (beforeConfig, afterConfig) => {
  const unicKeys = _.union(Object.keys(beforeConfig), Object.keys(afterConfig));

  const result = unicKeys.reduce((acc, el) => {
    const isKeyHasBefore = _.has(el)(beforeConfig);
    const isKeyHasAfter = _.has(el)(afterConfig);
    if (isKeyHasBefore && isKeyHasAfter) {
      if (beforeConfig[el] === afterConfig[el]) {
        return `${acc}   ${el}: ${beforeConfig[el]}\n`;
      }
      return `${acc} - ${el}: ${beforeConfig[el]}\n + ${el}: ${afterConfig[el]}\n`;
    }
    return `${acc} ${isKeyHasBefore ? '-' : '+'} ${el}: ${isKeyHasBefore ? beforeConfig[el] : afterConfig[el]}\n`;
  }, '');
  return result;
};

const getConfig = filePath => parseData(fs.readFileSync(filePath, 'utf8'), path.extname(filePath).slice(1));

const genDiff = (firstPath, secondPath) => {
  const firstConfig = getConfig(firstPath);
  const secondConfig = getConfig(secondPath);
  const diff = findDiff(firstConfig, secondConfig);
  return diff;
};

export default genDiff;

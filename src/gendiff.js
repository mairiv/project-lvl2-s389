import _ from 'lodash/fp';
import fs from 'fs';
import path from 'path';
import parseData from './parsers';
import renderDiff from './renderDiff';

const genAst = (beforeConfig, afterConfig) => {
  const iter = (firstObj, secondObj) => {
    const unicKeys = _.union(Object.keys(secondObj), Object.keys(firstObj));
    return unicKeys.map((el) => {
      const currEl = {};
      const hasKeyFirst = _.has(el)(firstObj);
      const hasKeySecond = _.has(el)(secondObj);

      currEl.elName = el;
      if (hasKeyFirst) {
        currEl.valueFirst = firstObj[el];
        currEl.isTreeFirst = currEl.valueFirst instanceof Object;
      }
      
      if (hasKeySecond) {
        currEl.valueSecond = secondObj[el];
        currEl.isTreeSecond = currEl.valueSecond instanceof Object;
      }

      const isGenerateChildren = (hasKeyFirst && hasKeySecond) && currEl.isTreeFirst && currEl.isTreeSecond;
      if (isGenerateChildren) {
        currEl.children = iter(currEl.valueFirst, currEl.valueSecond);
      }

      if (hasKeyFirst && hasKeySecond) {
        currEl.type = currEl.valueFirst === currEl.valueSecond ? 'equal' : 'changed';
      } else {
        currEl.type = hasKeyFirst ? 'deleted' : 'added';
      }

      return currEl;
    });
  };
  const ast = iter(beforeConfig, afterConfig);
  return ast;
};
const getConfig = filePath => parseData(fs.readFileSync(filePath, 'utf8'), path.extname(filePath).slice(1));

const genDiff = (firstPath, secondPath) => {
  const firstConfig = getConfig(firstPath);
  const secondConfig = getConfig(secondPath);
  const ast = genAst(firstConfig, secondConfig);
  const diff = renderDiff(ast);
  return diff;
};

export default genDiff;

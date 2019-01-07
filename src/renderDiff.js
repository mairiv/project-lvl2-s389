import _ from 'lodash/fp';

const getSpase = deep => '    '.repeat(deep);

const stringify = (obj, depthStart) => {
  const keys = Object.keys(obj);
  return keys.map((key) => {
    if (obj[key] instanceof Object) {
      const depthNext = depthStart + 1;
      return stringify(obj[key], depthNext);
    }
    return `{\n${getSpase(depthStart + 1)}${key}: ${obj[key]}\n${getSpase(depthStart)}}`;
  });
};


const getString = (type, el, depth) => {
  const getValue = (ordinalNum) => {
    const value = el[`isTree${ordinalNum}`] ? stringify(el[`value${ordinalNum}`], depth) : el[`value${ordinalNum}`];
    return value;
  };
  const firstValue = getValue('First');
  const secondValue = getValue('Second');
  const stringFromType = {
    equal: `${getSpase(depth)}${el.elName}: ${firstValue}`,
    changed: `${getSpase(depth - 1)}  - ${el.elName}: ${firstValue}\n${getSpase(depth - 1)}  + ${el.elName}: ${secondValue}`,
    deleted: `${getSpase(depth - 1)}  - ${el.elName}: ${firstValue}`,
    added: `${getSpase(depth - 1)}  + ${el.elName}: ${secondValue}`,
  };
  return stringFromType[type];
};

const renderDiff = (ast) => {
  const iter = (data, depth) => data.map((el) => {
    const { type } = el;
    const hasChildren = _.has('children')(el);

    if (hasChildren) {
      const depthNext = depth + 1;
      return `${getSpase(depth)}${el.elName}: {\n${iter(el.children, depthNext).join('\n')}\n${getSpase(depth)}}`;
    }
    return getString(type, el, depth);
  });
  return `{\n${iter(ast, 1).join('\n')}\n}`;
};

export default renderDiff;

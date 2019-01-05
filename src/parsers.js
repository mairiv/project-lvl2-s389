import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const parseData = (data, dataType) => parsers[dataType](data);

export default parseData;

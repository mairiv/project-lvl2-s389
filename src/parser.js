import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = {
  yml: content => yaml.safeLoad(content),
  json: content => JSON.parse(content),
};

const parseFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath);
  return parse[ext.slice(1)](content);
};

export default parseFile;

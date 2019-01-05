import path from 'path';
import fs from 'fs';
import generateDiff from '../src';

const resultFilePath = path.join(__dirname, '/__fixtures__/genDiffResult');

const testData = [
  [
    'json',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/before.json'),
      afterFilePath: path.join(__dirname, '/__fixtures__/after.json'),
    },
  ],
  [
    'YAML',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/before.yml'),
      afterFilePath: path.join(__dirname, '/__fixtures__/after.yml'),
    },
  ],
  [
    'ini',
    {
      beforeFilePath: path.join(__dirname, '/__fixtures__/before.ini'),
      afterFilePath: path.join(__dirname, '/__fixtures__/after.ini'),
    },
  ],
];

test.each(testData)(
  'gendiff %s files',
  (format, { beforeFilePath, afterFilePath }) => {
    expect(generateDiff(beforeFilePath, afterFilePath).trim())
      .toBe(fs.readFileSync(resultFilePath, 'utf8').trim());
  },
);

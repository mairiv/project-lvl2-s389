import path from 'path';
import fs from 'fs';
import generateDiff from '../src';

const resultFilePath = path.join(__dirname, '/__fixtures__/genDiffResult');
const beforeJsonFilePath = path.join(__dirname, '/__fixtures__/before.json');
const afterJsonFilePath = path.join(__dirname, '/__fixtures__/after.json');
const beforeYmlFilePath = path.join(__dirname, '/__fixtures__/before.yml');
const afterYmlFilePath = path.join(__dirname, '/__fixtures__/after.yml');

test('gendiff json files', () => {
  expect(generateDiff(beforeJsonFilePath, afterJsonFilePath).trim())
    .toBe(fs.readFileSync(resultFilePath, 'utf8').trim());
});

test('gendiff yml files', () => {
  expect(generateDiff(beforeYmlFilePath, afterYmlFilePath).trim())
    .toBe(fs.readFileSync(resultFilePath, 'utf8').trim());
});

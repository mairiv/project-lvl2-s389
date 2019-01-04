import path from 'path';
import fs from 'fs';
import generateDiff from '../dist/gendiff';

const fileresultPath = path.join(__dirname, '/__fixtures__/genDiffResult');
const fileBeforePath = path.join(__dirname, '/__fixtures__/before.json');
const fileAfterPath = path.join(__dirname, '/__fixtures__/after.json');
const expected = fs.readFileSync(fileresultPath, 'utf8').trim();

test('gendiff', () => {
  expect(generateDiff(fileBeforePath, fileAfterPath).trim())
    .toBe(expected);
});

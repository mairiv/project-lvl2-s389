import commander from 'commander';
import generateDiff from './gendiff';

const program = commander;

const gendiff = () => {
  const { args } = program
    .command('gendiff <firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

  const [firstConfig, secondConfig] = args;
  return generateDiff(firstConfig, secondConfig);
};

export default gendiff;

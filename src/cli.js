import commander from 'commander';
import genDiff from '.';

const runProgram = () => {
  const program = commander;
  const { args } = program
    .command('gendiff <firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

  if (args.length === 0) {
    program.help();
  } else {
    const firstFilePath = args[0];
    const secondFilePath = args[1];
    const diff = genDiff(firstFilePath, secondFilePath);
    console.log(diff);
  }
};

export default runProgram;

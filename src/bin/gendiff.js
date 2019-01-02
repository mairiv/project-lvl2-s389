#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
  .command('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}

import process from 'process';
import { _baseOptions, _underscoreOption } from '../core/yargs';

import helpers from '../helpers';
import fs from 'fs';
import clc from 'cli-color';

exports.builder = (yargs) =>
  _underscoreOption(
    _baseOptions(yargs).option('name', {
      describe: 'Defines the name of the migration',
      type: 'string',
      demandOption: true,
    })
  ).argv;

exports.handler = function (args) {
  helpers.init.createTsMigrationsFolder();

  fs.writeFileSync(
    helpers.path.getTsMigrationPath(args.name),
    helpers.template.render(
      'migrations/ts-skeleton.ts',
      {},
      {
        beautify: false,
      }
    )
  );

  helpers.view.log(
    'New migration was created at',
    clc.blueBright(helpers.path.getTsMigrationPath(args.name)),
    '.'
  );

  process.exit(0);
};

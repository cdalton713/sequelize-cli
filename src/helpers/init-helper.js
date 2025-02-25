import helpers from './index';
import path from 'path';
import fs from 'fs';

function createFolder(folderName, folder, force) {
  if (force && fs.existsSync(folder) === true) {
    helpers.view.log('Deleting the ' + folderName + ' folder. (--force)');

    try {
      fs.readdirSync(folder).forEach((filename) => {
        fs.unlinkSync(path.resolve(folder, filename));
      });
    } catch (e) {
      helpers.view.error(e);
    }

    try {
      fs.rmdirSync(folder);
      helpers.view.log('Successfully deleted the ' + folderName + ' folder.');
    } catch (e) {
      helpers.view.error(e);
    }
  }

  try {
    if (fs.existsSync(folder) === false) {
      helpers.asset.mkdirp(folder);
      helpers.view.log(
        'Successfully created ' + folderName + ' folder at "' + folder + '".'
      );
    } else {
      helpers.view.log(
        folderName + ' folder at "' + folder + '" already exists.'
      );
    }
  } catch (e) {
    helpers.view.error(e);
  }
}

const init = {
  createMigrationsFolder: (force) => {
    createFolder('migrations', helpers.path.getPath('migration'), force);
  },
  createTsMigrationsFolder: (force) => {
    createFolder('migrations', helpers.path.getPath('ts-migration'), force);
  },
  createSeedersFolder: (force) => {
    createFolder('seeders', helpers.path.getPath('seeder'), force);
    createFolder('seeders', helpers.path.getPath('ts-seeder'), force);
  },

  createModelsFolder: (force) => {
    createFolder('models', helpers.path.getModelsPath(), force);
    createFolder('ts-models', helpers.path.getModelsPath(), force);
  },

  createModelsIndexFile: (force) => {
    const modelsPath = helpers.path.getModelsPath();
    const indexPath = path.resolve(
      modelsPath,
      helpers.path.addFileExtension('index')
    );

    if (!helpers.path.existsSync(modelsPath)) {
      helpers.view.log('Models folder not available.');
    } else if (helpers.path.existsSync(indexPath) && !force) {
      helpers.view.notifyAboutExistingFile(indexPath);
    } else {
      const relativeConfigPath = path.relative(
        helpers.path.getModelsPath(),
        helpers.config.getConfigFile()
      );

      helpers.asset.write(
        indexPath,
        helpers.template.render(
          'models/index.js',
          {
            configFile:
              "__dirname + '/" + relativeConfigPath.replace(/\\/g, '/') + "'",
          },
          {
            beautify: false,
          }
        )
      );
    }
  },
};

module.exports = init;
module.exports.default = init;

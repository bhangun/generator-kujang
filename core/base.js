var Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');
const chalk = require('chalk');


module.exports = class extends Generator {

  constructor(args, opts, features) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts, features);
    // expose lodash to templates
    this._ = _;
  }

  /**
* Override yeoman generator's usage function to fine tune --help message.
*/
  usage() {
    return super.usage().replace('yo kujang:', 'kujang ');
  }

  /**
 * @returns default app name
 */
  getDefaultAppName() {
    return /^[a-zA-Z0-9-_]+$/.test(path.basename(process.cwd())) ? path.basename(process.cwd()) : 'kujang';
  }


  /**
 * Apply output customizer.
 *
 * @param {string} outputPath - Path to customize.
 */
  applyOutputPathCustomizer(outputPath) {
    let outputPathCustomizer = this.options.outputPathCustomizer;
    if (!outputPathCustomizer && this.configOptions) {
      outputPathCustomizer = this.configOptions.outputPathCustomizer;
    }
    if (!outputPathCustomizer) {
      return outputPath;
    }
    outputPath = outputPath ? normalize(outputPath) : outputPath;
    if (Array.isArray(outputPathCustomizer)) {
      outputPathCustomizer.forEach(customizer => {
        outputPath = customizer.call(this, outputPath);
      });
      return outputPath;
    }
    return outputPathCustomizer.call(this, outputPath);
  }

  /**
   * Fetch files from the generator-kujang instance installed
   * @param {...string} subpath : the path to fetch from
   */
  fetchFrom(...subpath) {
    return path.join(__dirname, ...subpath);
  }

  /**
   * Utility function to copy and process templates.
   *
   * @param {string} source - source
   * @param {string} destination - destination
   * @param {*} generator - reference to the generator
   * @param {*} options - options object
   * @param {*} context - context
   */
  template(source, destination, generator, context, options = {}) {
    const _this = generator || this;
    const _context = context || _this;
    const customDestination = _this.destinationPath(destination);
    if (!customDestination) {
      this.debug(`File ${destination} ignored`);
      return Promise.resolved();
    }
    return this.renderContent(source, _this, _context, options).then(res => {
      _this.fs.write(customDestination, res);
      return customDestination;
    });
  }


  /**
* Override yeoman generator's destinationPath to apply custom output dir.
*/
  destinationPath(...paths) {
    paths = path.join(...paths);
    paths = this.applyOutputPathCustomizer(paths);
    return paths ? super.destinationPath(paths) : paths;
  }


  /**
   * Render content
   *
   * @param {string} source source
   * @param {object} generator reference to the generator
   * @param {any} context context
   * @param {object} options options
   * @param {function} [cb] callback function
   * @return {Promise<String>} Promise rendered content
   */
  renderContent(source, generator, context, options, cb) {
    options = {
      root: options.root || generator.templatePath(),
      context: generator,
      ...options,
    };

    if (context.entityClass) {
      const basename = path.basename(source);
      if (context.configOptions && context.configOptions.sharedEntities) {
        Object.values(context.configOptions.sharedEntities).forEach(entity => {
          entity.resetFakerSeed(`${context.entityClass}-${basename}`);
        });
      } else if (context.resetFakerSeed) {
        context.resetFakerSeed(basename);
      }
    }
    const promise = ejs.renderFile(generator.templatePath(source), context, options);
    if (cb) {
      return promise
        .then(res => cb(res))
        .catch(err => {
          generator.warning(`Copying template ${source} failed. [${err}]`);
          throw err;
        });
    }
    return promise;
  }


  /**
   * Rewrite file with passed arguments
   * @param {object} args argument object (containing path, file, haystack, etc properties)
   * @param {object} generator reference to the generator
   */
  rewriteFile(args, generator) {
    let fullPath;
    if (args.path) {
      fullPath = path.join(args.path, args.file);
    }
    fullPath = generator.destinationPath(args.file);

    args.haystack = generator.fs.read(fullPath);
    const body = rewrite(args);
    generator.fs.write(fullPath, body);
    return args.haystack !== body;
  }


  /**
   * Utility function to copy files.
   *
   * @param {string} source - Original file.
   * @param {string} destination - The resulting file.
   */
  copy(source, destination) {
    const customDestination = this.destinationPath(destination);
    if (!customDestination) {
      this.debug(`File ${destination} ignored`);
      return;
    }
    this.fs.copy(this.templatePath(source), customDestination);
  }

  /**
   * Print a debug message.
   *
   * @param {string} msg - message to print
   * @param {string[]} args - arguments to print
   */
  debug(msg, ...args) {
    const formattedMsg = `${chalk.yellow.bold('DEBUG!')} ${msg}`;
    if ((this.configOptions && this.configOptions.isDebugEnabled) || (this.options && this.options.debug)) {
      this.log(formattedMsg);
      args.forEach(arg => this.log(arg));
    }
    if (this._debug && this._debug.enabled) {
      this._debug(formattedMsg);
      args.forEach(arg => this._debug(arg));
    }
  }


  /**
   * Check if Node is installed
   */
  /* checkNode() {
   if (this.skipChecks) return;
   const nodeFromPackageJson = packagejs.engines.node;
   if (!semver.satisfies(process.version, nodeFromPackageJson)) {
     this.warning(
       `Your NodeJS version is too old (${process.version}). You should use at least NodeJS ${chalk.bold(nodeFromPackageJson)}`
     );
   }
   if (!(process.release || {}).lts) {
     this.warning(
       'Your Node version is not LTS (Long Term Support), use it at your own risk! Kujang does not support non-LTS releases, so if you encounter a bug, please use a LTS version first.'
     );
   }
 } */

  /**
   * Check if Git is installed
   */
  checkGit() {
    if (this.skipChecks || this.skipClient) return;
    this.gitInstalled = this.isGitInstalled();
  }
}
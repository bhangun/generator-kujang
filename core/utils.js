const SwaggerParser = require("@apidevtools/swagger-parser");

module.exports = {
  applyOutputPathCustomizer,
  fetchFrom,
  destinationPath,
  template,
  renderContent,
  rewriteFile,
  copy,
  debug,
  getOpenApi
};


/**
* Apply output customizer.
*
* @param {string} outputPath - Path to customize.
*/
function applyOutputPathCustomizer(outputPath) {
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
function fetchFrom(...subpath) {
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
function template(source, destination, generator, context, options = {}) {
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
function destinationPath(...paths) {
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
function renderContent(source, generator, context, options, cb) {
  options = {
    root: options.root || generator.templatePath(),
    context: generator,
    ...options,
  };

  this.log(context)

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
function rewriteFile(args, generator) {
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
function copy(source, destination) {
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
function debug(msg, ...args) {
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

function getOpenApi(params) {
  SwaggerParser.validate(params, (err, api) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log("API name: %s, Version: %s", api.info.title, api.info.version);
      //console.log(api)
      console.log(api.paths['/pet/{petId}/uploadImage'].post.consumes)
    }
  });
}

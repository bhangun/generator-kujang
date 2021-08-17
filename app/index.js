const GenBase = require('../core/base');


const writeFiles = require('./files').writeFiles;

module.exports = class extends GenBase {

    constructor(args, opts, features) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts, features);
        // expose lodash to templates
     
        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }

    get writing() {
        return writeFiles();
    }
};
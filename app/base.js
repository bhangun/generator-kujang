var Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

const chalk = require('chalk');
const shelljs = require('shelljs');
const semver = require('semver');
const exec = require('child_process').exec;
const https = require('https');




module.exports = class extends Generator {

    constructor(args, opts, features) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts, features);
        // expose lodash to templates
        this._ = _;

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }
}
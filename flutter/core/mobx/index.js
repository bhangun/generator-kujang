const GenBase = require('kujang-core/core');

const writeFiles = require('./files').writeFiles;

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    compose(){
        console.log(this.config.get('stateManagementType'))

        writeFiles(this.props);
    }
}
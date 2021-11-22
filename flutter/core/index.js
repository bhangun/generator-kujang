const GenBase = require('kujang-core/core');

const writeFilesMobx = require('./mobx/files').writeFiles;
const writeFilesBloc = require('./bloc/files').writeFiles;
const writeFilesRiverpod = require('./riverpod/files').writeFiles;

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    compose(){
        console.log(this.config.get('stateManagementType'))
      
        if(this.config.get('stateManagementType') == 'mobx')
            return writeFilesMobx(this.props);
        else if (this.config.get('stateManagementType') == 'riverpod')
            return writeFilesRiverpod(this.props);
        else return writeFilesBloc(this.props);

    }
}
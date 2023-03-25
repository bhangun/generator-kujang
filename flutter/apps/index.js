const GenBase = require('keris/core');
module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    compose(){

        if(this.config.get('stateManagementType') == 'mobx')
            this.composeWith(require.resolve('./mobx'), this.props);
        else if (this.config.get('stateManagementType') == 'riverpod')
            this.composeWith(require.resolve('./riverpod'), this.props, this);
        else  this.composeWith(require.resolve('./bloc'), this.props); 
    }
}
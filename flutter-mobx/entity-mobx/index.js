const GenBase = require('kujang-core/core/base');
const writeEntity = require('./files').writeFiles;

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    writingEntity() {
        this.props.entities.forEach(entity => {
            writeEntity(this.props.packageFolder, entity, this)
        })
    }
}
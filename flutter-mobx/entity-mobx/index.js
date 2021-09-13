const GenBase = require('kujang-core/core/base');
const writeEntity = require('./files').writeFiles;
const writeOperation = require('./operation').writeFiles;

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    writingEntity() {

        if (this.props.entities.length>0) this.props.entities.forEach(e => {
            this.props.entity = e   
            writeEntity(this.props.packageFolder, this, this.props,  this._)
        })
        else this.otherEntity(this.props.paths).forEach(el =>{
            this.props.entity = el
            writeEntity(this.props.packageFolder, this, this.props,  this._)
        })
        this.props._ = this._
        this.props.paths.forEach((path,i) =>{
            writeOperation(this.props.packageFolder, path, this, i, this.props)
        })
    }
}

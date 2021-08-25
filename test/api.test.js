
const GenBase = require('../core/base');
const utils = require('../core/utils');
const SwaggerParser = require("@apidevtools/swagger-parser");



const API2 = 'https://petstore.swagger.io/v2/swagger.json'
const API3 = 'https://petstore3.swagger.io/api/v3/openapi.json'

const tes = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = 'testing'
        this.props = opts
    }
}

function writingEntity() {
    SwaggerParser.validate(API3, (err, api) => {
        if (err) {
            console.error(err);
        }
        else {
            this.props = utils.mappingProps(api,'testing')
            console.log(this.props.paths)
            console.log(this.props.paths[7].methods)
        }
    })
}

writingEntity()

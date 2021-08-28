
const GenBase = require('../core/base');
const utils = require('../core/utils');
const SwaggerParser = require("@apidevtools/swagger-parser");



const API2 = 'https://petstore.swagger.io/v2/swagger.json'
const API3 = 'https://petstore3.swagger.io/api/v3/openapi.json'
const API4 = 'test/pet-oas3.yaml'

const tes = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = 'testing'
        this.props = opts
    }
}

function writingEntity() {
    SwaggerParser.validate(API4, (err, api) => {
        if (err) {
            console.error(err);
        }
        else {
            //console.log(api)
            this.props = utils.mappingProps(api,'testing')
            console.log(this.props.entities[6].entityClass)
            console.log(this.props.entities[6].fields)
            console.log(this.props.paths[0].methods)
            console.log('#/components/schemas/Order'.split('#/components/schemas/')[1])
          // console.log(this.props.securitySchemes[0].url.implicit)
            //console.log(this.props.paths[7].methods)
        }
    })
}

writingEntity()

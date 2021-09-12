
const GenBase = require('kujang-core/core/base');
const utils = require('kujang-core/core/utils');


const API2 = 'https://petstore.swagger.io/v2/swagger.json'
const API3 = 'https://petstore3.swagger.io/api/v3/openapi.json'
const API4 = 'test/pet-oas3.yaml'
const API5 = '../api_sample/oas_taufik.yaml'

const tes = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = 'testing'
        this.props = opts
    }
}

function writingEntity() {

    utils.transformApi(this.appsName, API5, (api)=>{
        this.props = api
         // console.log(this.props.entities[6].entityClass)
       //  console.log(JSON.stringify(this.props))
         //console.log(this.props.paths[0].methods)
        // console.log('#/components/schemas/Order'.split('#/components/schemas/')[1])
       // console.log(this.props.securitySchemes[0].url.implicit)
         //console.log(this.props.paths[7].methods)
    })
}

function writingEntity2() {
    utils.transformApi(this.appsName, API5, (api)=>{
        this.props = api
         // console.log(this.props.entities[6].entityClass)
         console.log(JSON.stringify(this.props))
            console.log(this.props.paths[0].methods)
            for (const i in this.props.paths) {
                for (const m in this.props.paths[i].methods) {
                    const path = this.props.paths[i].path;
                    const requestType = this.props.paths[i].methods[m].requestBodyType;
                    /* const requestClass = capitalize(requestType);
                    const requestBodyClass = capitalize(requestType); 
                    const responseClass = (this.props.paths[i].methods[m].responseType)?capitalize(this.props.paths[i].methods[m].responseType):capitalize(this.props.paths[i].methods[m].tags[0]); 
                    const methodName = this.props.paths[i].methods[m].operationId;
                    const isInput = requestType?true:false;
                    const methodPath = validatePath(this.props.paths[i].methods[m].method);
                    const desc = this.props.paths[i].methods[m].description; 
                    const summary = this.props.paths[i].methods[m].summary;
                    const param =  putParam(this.props.paths[i].methods[m]);
                    const parameters = param.param;
                    const query = param.query; */
                  
                    let payload = '';
                    let payloadStatement = '';
                    /* if(methodPath == 'post' || methodPath == 'update'){
                      payload = ', '+param.payload;
                      payloadStatement = param.payloadStatement;
                    } */

                    console.log(path)
                    console.log(requestType)
                }
            }
        
    })
}

function writingJson() {

    utils.transformApi(this.appsName, props.path_api, (api, origin)=>{
       
       // this.writeKujangJson(this.appsName,api)
       // this.writeOriginJson(this.appsName,origin)
    })

    utils.transformApi(this.appsName, API5, (api)=>{
        this.props = api
    
    })
}

writingEntity()
//writingEntity2()

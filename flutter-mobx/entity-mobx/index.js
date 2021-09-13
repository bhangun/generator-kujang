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
       /*  if (this.props.entities.length>0) this.props.entities.forEach(entity => {
            writeEntity(this.props.packageFolder, entity, this, this._)
        })
        else otherEntity(this.props.paths, this.transformType, this._).forEach(e =>{
            writeEntity(this.props.packageFolder, e, this, this._)
        }) */


        this.props.paths.forEach((path,i) =>{
            //console.log(this._)
            writeOperation(this.props.packageFolder, path, this, i, this._, this.appsName)
        })
    }
}

function otherEntity(paths,transformType,_) {
    const responseTypes = [];
    for (const i in paths) {
        for (const m in paths[i].methods) {
            let responseType = ''
            // RESPONSE
            const responses = paths[i].methods[m].responses;
            const code200 = responses.find(e => e.code == '200')
            const responseContent = code200 ? code200 : {}

            if (responseContent.content.component)
                responseType = responseContent.content.component
            else if (responseContent.content.items.type)
                responseType = _.capitalize(responseContent.content.items.type + '' + i)
            else responseType = 'Object' + i

            responseTypes.push(
                {
                    "appsName": responseType,
                    "pkType": "String",
                    "relationships": [],
                    "entityName": _.capitalize(responseType),
                    "entityClass": _.capitalize(responseType),
                    "entityInstance": responseType,
                    "entityFolderName": responseType,
                    "entityFileName": responseType,
                    "enableTranslation": false,
                    "fields": otherFields(paths[i].methods[m],transformType)
                }
            )
        }
    }
    return responseTypes
}

function otherFields(input,transformType) {
    let param = {}
    const fields = []
    let isProp = false

    if (input.parameters)
        param = input.parameters
    else {
        param = input.requestBody.properties;
        isProp = true
    }

    for(const p in param){
        fields.push(
            {
                "fieldType": transformType(isProp?param[p].dartType : param[p].schema.type,false),
                "fieldName": param[p].name,
                "fieldIsEnum": false,
                "fieldValues": "",
                "fieldsContainOneToMany": false,
                "fieldsContainOwnerManyToMany": false,
                "fieldsContainOwnerOneToOne": false,
                "fieldsContainNoOwnerOneToOne": false,
                "fieldsContainManyToOne": false
            }
        )
    }

    return fields
}
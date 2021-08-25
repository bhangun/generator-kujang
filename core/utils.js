const _ = require('lodash');

module.exports = {
  mappingProps,
  mappingEntities,
  mappingFields,
  mappingRelationship,
  getPaths,
  getPathMethod
};

function mappingProps(api, appsName) {
  return {
    appsName: appsName,
    baseName: appsName,
    packageFolder: appsName,
    info: api.info,
    entities: mappingEntities(appsName, api),
    paths: getPaths(api)
  }
}

/**
 * 
 * @param {*} appsName Application name
 * @param {*} api OpenAPi object
 * @returns entites
 */
function mappingEntities(appsName, api) {

  const schema = api.components.schemas
  const entities = []
  Object.entries(schema).forEach(entity => {
    entities.push({
      appsName: appsName,
      pkType: 'String',
      relationships: [],
      entityName: entity[0],
      entityClass: entity[0],
      entityInstance: _.camelCase(entity[0]),
      entityFolderName: _.camelCase(entity[0]),
      entityFileName: _.camelCase(entity[0]),
      enableTranslation: false,
      fields: mappingFields(entity[1], schema)
    })
  })
  return entities
}

/**
 * 
 * @param {*} obj 
 * @param {*} entities 
 * @returns 
 */
function mappingFields(obj, entities) {
  const fields = []
  Object.entries(obj.properties).forEach(field => {
    fields.push({
      fieldType: sanitaizeField(field[1].type, entities),
      fieldName: _.camelCase(field[0]),
      fieldIsEnum: (field[1].enum) ? true : false,
      fieldValues: _.join(field[1].enum, ','),
      fieldDescription: field[1].description,
      fieldsContainOneToMany: false,
      fieldsContainOwnerManyToMany: false,
      fieldsContainOwnerOneToOne: false,
      fieldsContainNoOwnerOneToOne: false,
      fieldsContainManyToOne: false
    })
  })
  return fields
}

/**
 * 
 * @param {*} api Api root
 */
function getPaths(api) {
  const paths = []
  Object.entries(api.paths).forEach(path => {
    const param = splitParam(path[0])
    const hasParam = path[0].split('{').length>1
    paths.push({
      pathOrigin: path[0],
      path: param, 
      hasParam: hasParam,
      methods: getPathMethod(path[1])
    })
  })
  return paths
}

function splitParam(path){
  return path.replace('{','${')
}

/**
 * 
 * @param {*} path  path
 */
function getPathMethod(path) {
  const methods = []
  
  Object.entries(path).forEach(method => {
    const m = method[1];
    const contentsRequest = []
    let typeRequest = ''
    let required = []
    const result = getResponses(m)
    //let parameter = []

    if (m.requestBody)
      Object.entries(m.requestBody.content).forEach(c => {
        typeRequest = c[1].schema.xml ? c[1].schema.xml.name : ''
        required = c[1].schema.required
        contentsRequest.push(c[0])
      })

    //if(m.parameters.length > 0)
    //  parameter = m.parameters

    methods.push({
      method: method[0],
      parameters: m.parameters,
      tags: m.tags,
      summary: m.summary,
      description: m.description,
      operationId: m.operationId,

      requestBodyDesc: m.requestBody ? m.requestBody.description : '',
      requestBodyType: typeRequest,
      requestBodyRequired: required,
      requestContentType: contentsRequest,
      responseType: result.type,
      responses: result.responses
    })
  })
  return methods
}

function getResponses(list) {
  const responses = []
  let type = ''
  if (list)
    Object.entries(list.responses).forEach(r => {
      const types = []
      let responseType = ''
      
      let headersType = []
      
      if (r[1].content)
        Object.entries(r[1].content).forEach(c => {
          responseType = c[1].schema.xml ? c[1].schema.xml.name : ''
          types.push(c[0])
        })

      if (r[1].headers)
        Object.entries(r[1].headers).forEach(c => {
          headersType.push(c[0])
        })

      if ('200' == r[0])
        type = responseType

      responses.push({
        responseCode: r[0],
        responseDesc: r[1].description ? r[1].description : '',
        responseType: responseType,
        responseContentType: types,
        responseHeaders: headersType
      })
    })
  return { responses: responses, type: type };
}


/**
 * 
 * @param {*} field 
 * @param {*} entities 
 * @returns 
 */
function sanitaizeField(field, entities) {
  let newField = ''
  if (field.fieldType == 'object') {
    // newField = 'String'
  }
  else if (field.fieldType == 'array') {
    newField = 'Array<String>'
  }
  return _.capitalize(newField)
}


/**
 * 
 * @param {*} obj 
 * @returns 
 */
function mappingRelationship(obj) {
  const relationship = []

  relationship.otherEntityModulePath
  relationship.otherEntityModuleName
  relationship.otherEntityStateName =
    relationship.otherEntityFieldCapitalized
  relationship.otherentityClass = 'User';
  relationship.otherEntityTableName
  relationship.otherEntityNameCapitalized
  relationship.otherEntityNamePlural
  relationship.otherEntityName

  return relationship
}

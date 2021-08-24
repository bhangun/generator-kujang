const _ = require('lodash');

module.exports = {

  mappingEntities,
  mappingFields,
  mappingRelationship,
  getPaths,
  getPathMethod
};

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
    paths.push({
      path: path[0],
      methods: getPathMethod(path[1])
    })
  })
  return paths
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

    if (m.requestBody)
      Object.entries(m.requestBody.content).forEach(c => {
        typeRequest = c[1].schema.xml ? c[1].schema.xml.name : ''
        required = c[1].schema.required
        contentsRequest.push(c[0])
      })

    methods.push({
      method: method[0],
      tags: m.tags,
      summary: m.summary,
      description: m.description,
      operationId: m.operationId,

      requestBodyDesc: m.requestBody ? m.requestBody.description : '',
      requestBodyType: typeRequest,
      requestBodyRequired: required,
      requestContentType: contentsRequest,

      responses: getResponses(m)
    })
  })
  return methods
}

function getResponses(list) {
  const responses = []
  
  if (list)
    Object.entries(list.responses).forEach(r => {
      const types = []
      let typeRequest = ''
      let headersType = []
     // console.log(r)
      if (r[1].content)
        Object.entries(r[1].content).forEach(c => {
          typeRequest = c[1].schema.xml ? c[1].schema.xml.name : ''
          types.push(c[0])
          /* console.log('----------')
          console.log(c[0]) */
        })
       
        if (r[1].headers)
        Object.entries(r[1].headers).forEach(c => {
          //headersType = c[1].schema.xml ? c[1].schema.xml.name : ''
          headersType.push(c[0])
        })

      responses.push({
        responseCode: r[0],
        responseDesc: r[1].description ? r[1].description : '',
        responseType: typeRequest,
        responseContentType: types,
        responseHeaders: headersType
      })
    })
  return responses;
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

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
      entityInstance: entity[0],
      entityFolderName: entity[0],
      entityFileName: entity[0],
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
  Object.entries(api.paths).forEach(path=>{
    paths.push({
      path: path[0],
      methods: getPathMethod(api.paths)
    })
  })
}

/**
 * 
 * @param {*} paths list of paths
 */
function getPathMethod(paths) {
  const methods = []
  Object.entries(paths).forEach(method=>{
    const m = method[1];
    const contents = []
    const type = ''
    const required = []

    Object.entries(m.requestBody.content).forEach(c =>{
      contents.push(c[0])
      type = c[1].schema.xml
      required = c[1].schema.required
    })

    methods.push({
      method: method[0],
      tags: m.tags,
      summary: m.summary,
      description: m.description,
      operationId: m.operationId,
      requestBodyDesc: m.requestBody.description,
      requestBodyType: type,
      requestBodyRequired: required,
      contentType: contents,
    })
  })
}


/**
 * 
 * @param {*} field 
 * @param {*} entities 
 * @returns 
 */
function sanitaizeField(field, entities) {
  let newField =''
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

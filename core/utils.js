const _ = require('lodash');

module.exports = {

  mappingEntities,
  mappingFields,
  mappingRelationship,

};

/**
 * 
 * @param {*} appsName Application name
 * @param {*} api OpenAPi object
 * @returns entites
 */
function mappingEntities(appsName, api) {
  
  //console.log(Object.entries(Object.entries(api.paths)[0][1].post.requestBody.content)[0][1].schema.properties.tags.items)
  //console.log(Object.entries(Object.entries(api.paths)[0][1].post.requestBody.content)[2][1])
  //console.log(Object.entries(Object.entries(api.paths)[0][1].post.responses.content)[2][1])
  console.log(Object.entries(Object.entries(api.paths)[0][1].post.responses)[0][1].content)
  //console.log(Object.entries(api.paths)[0][1].post.requestBody.content)

  //console.log(Object.entries(Object.entries(api.paths)[0][1].put.responses)[0][1].content)
  //console.log(Object.entries(api.paths)[0][1].put.security)
 // console.log(Object.entries(api.components.schemas.Pet)[2])
 

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

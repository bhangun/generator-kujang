
module.exports = {

  mappingEntities,
  mappingFields,
  mappingRelationship
};


function mappingFields(obj, entities) {
  const fields = []
  Object.entries(obj.properties).forEach(field => {
    fields.push({
      fieldType: field[1].type,
      fieldName: field[0],
      fieldIsEnum: false,//(field[1].enum) ? true : false,
      fieldValues: field[1].enum,
      fieldDescription: field[1].description
    })
  })
  return fields
}

function mappingEntities(appsName, obj) {
  const entities = []
  Object.entries(obj).forEach(entity => {
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
      fields: mappingFields(entity[1], obj)
    })
  })
  return entities
}


function mappingRelationship(obj) {
  const relationship = []

  return relationship
}


const _ = require('lodash');

module.exports = {
  mappingProps,
  mappingEntities,
  mappingFields,
  mappingRelationship,
  getPaths,
  getPathMethod
};

/**
 * Mapping all api element to kujang schema
 * @param {*} api 
 * @param {*} appsName 
 * @returns api element
 */
function mappingProps(api, appsName) {
  return {
    appsName: appsName,
    baseName: appsName,
    packageFolder: appsName,
    info: api.info,
    entities: mappingEntities(appsName, api),
    paths: getPaths(api),
    servers: api.servers,
    securitySchemes: getSecurity(api.components.securitySchemes),
    tags: api.tags
  }
}

/**
 * Get security information
 * @param {*} api 
 */
function getSecurity(api) {
  const schema = []
  Object.entries(api).forEach(sch => {
    let scopes = []
    let url = ''
    let typeName = ''
    let position = ''

    if (sch[1].flows){
      scopes = getScopes(sch[1].flows.implicit.scopes)
      url = sch[1].flows.implicit.authorizationUrl
    }
    
    if(sch[1].name)
      typeName = sch[1].name

    if(sch[1].in)
      position = sch[1].in

    schema.push({
      name: sch[0],
      type: sch[1].type,
      typeName: typeName,
      url: url,
      in: position,
      scopes: scopes
    })
  })
  return schema
}

/**
 * Mapping scopes
 * @param {*} input 
 * @returns 
 */
function getScopes(input) {
  const scopes = []
  Object.entries(input).forEach(s => {
    scopes.push({
      scope: s[0],
      description: s[1]
    })
  })
  return scopes
}

/**
 * Mapping component to be entities and as repositories
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
 * Mapping fiels as properties of entity
 * @param {*} obj 
 * @param {*} entities 
 * @returns 
 */
function mappingFields(obj, entities) {
  const fields = []
  Object.entries(obj.properties).forEach(field => {
    fields.push({
      fieldType: transformType(field[1], entities, field[1].enum),
      fieldName: _.camelCase(field[0]),
      fieldIsEnum: field[1].enum? true : false,
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
 * Sanitize / convert type
 * @param {*} field 
 * @param {*} entities 
 * @returns 
 */
 function transformType(type, entities, isEnum) {
  let newType = {}
  newType.origin = type.type?type.type:''
  newType.example = type.example? type.example :''
  newType.description = type.description? type.description:''
  newType.dart = ''
  newType.dartDesc = ''

  switch (type.type) {
    case 'integer':
      if(type.format == 'int64')
        newType.dart = 'double'
      else if (type.format == 'int32') 
        newType.dart = 'int'
      break;
    case 'number':
      if(type.format == 'float') 
        newType.dart = 'Float'
      else if (type.format == 'double') 
        newType.dart = 'double'
      break;
    case 'string':
      if (type.format == 'byte') 
        newType.dart = 'ByteData'
      else if (type.format == 'binary') 
        newType.dart = 'BinaryCodec'
      else if (type.format == 'date')
        newType.dart = 'DateTime'
      else if(type.format == 'date-time')
        newType.dart = 'DateTime'
      else if (type.format == 'password') 
        newType.dart = 'String'
      else newType.dart = 'String'
      break;
    case(type.type == 'Instant'): 
        newType.dart = 'int'
        newType.dartDesc = '.toIso8601String()' + 'Z'
      break
    case 'array':
      newType.dart = 'List<String>'
      break;
    case 'uuid':
      newType.dart = 'String'
      break;
  }
  
  if(isEnum) newType.dart = 'String'

  return newType
} 



/**
 * Mapping path to be use as services
 * @param {*} api Api root
 */
function getPaths(api) {
  const paths = []
  Object.entries(api.paths).forEach(path => {
    const param = splitParam(path[0])
    const hasParam = path[0].split('{').length > 1
    paths.push({
      pathOrigin: path[0],
      path: param,
      hasParam: hasParam,
      methods: getPathMethod(path[1])
    })
  })
  return paths
}

function splitParam(path) {
  return path.replace('{', '${')
}

/**
 * Get Path method
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

    if (m.requestBody)
      Object.entries(m.requestBody.content).forEach(c => {
        typeRequest = c[1].schema.xml ? c[1].schema.xml.name : ''
        required = c[1].schema.required
        contentsRequest.push(c[0])
      })

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

/**
 * Mapping responses
 * @param {*} list 
 * @returns 
 */
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
 * Mapping relationship of component/entities 
 * @param {*} obj 
 * @returns 
 */
function mappingRelationship(obj) {
  const relationship = []

  /* relationship.otherEntityModulePath
  relationship.otherEntityModuleName
  relationship.otherEntityStateName =
    relationship.otherEntityFieldCapitalized
  relationship.otherentityClass = 'User';
  relationship.otherEntityTableName
  relationship.otherEntityNameCapitalized
  relationship.otherEntityNamePlural
  relationship.otherEntityName
 */
  return relationship
}

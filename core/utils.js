const SwaggerParser = require("@apidevtools/swagger-parser");

module.exports = {
  /*   applyOutputPathCustomizer,
    fetchFrom,
    destinationPath,
    template,
    renderContent,
    rewriteFile,
    copy,
    debug, */
  getOpenApi,
  mappingEntity
};
/* 

function getOpenApi(params) {
  let callback = {}
  SwaggerParser.validate(params, (err, api) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log("API name: %s, Version: %s", api.info.title, api.info.version);
      callback = api.openapi
      //console.log(api)
      console.log(api.paths['/pet/{petId}/uploadImage'])
      return callback
    }
  });

  console.log(callback)
  console.log('---------')
  return callback;
} */

function mappingEntity() {
  const context = this.context;

  entityClass
  entityInstance

/*   fields = [];
  field.fieldType;
  field.fieldName;
  field.fieldIsEnum
  field.fieldDescription

  fieldType === 'UUID'
  fieldType === 'Integer'
  fieldType === 'Instant'

  relationships = [];
  rela.relationshipType == 'many-to-one'
  rela.relationshipType == 'one-to-one' 
  rela.ownerSide == true 
  rela.relationshipType == 'many-to-many' 
  rela.relationshipName; 
  rela.otherEntityName */

/* 
  const nonEnumType = _.includes(['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal',
  'LocalDate', 'Instant', 'ZonedDateTime', 'Boolean', 'byte[]', 'ByteBuffer'], fieldType);
 */

  context.pagination = 'no';
  context.validation = false;


  const entityName = context.name;
  const entityNamePluralizedAndSpinalCased = _.kebabCase(pluralize(entityName));

  context.entityClass = context.entityNameCapitalized;
  context.entityClassHumanized = _.startCase(context.entityNameCapitalized);
  context.entityClassPlural = pluralize(context.entityClass);
  context.entityClassPluralHumanized = _.startCase(context.entityClassPlural);
  context.entityInstance = _.lowerFirst(entityName);
  context.entityInstancePlural = pluralize(context.entityInstance);
  context.entityApiUrl = entityNamePluralizedAndSpinalCased;
  context.entityFileName = _.kebabCase(context.entityNameCapitalized + _.upperFirst(context.entityAngularJSSuffix));
  context.entityFolderName = context.entityFileName;
  context.entityPluralFileName = entityNamePluralizedAndSpinalCased + context.entityAngularJSSuffix;
  context.entityServiceFileName = context.entityFileName;

  context.entityClass = context.entityClass + _.upperFirst(_.camelCase(context.entityAngularJSSuffix));
  context.entityStateName = _.kebabCase(context.entityClass);
  context.entityUrl = context.entityStateName;
  context.entityTranslationKey = context.entityInstance;
  context.entityTranslationKeyMenu = _.camelCase(context.entityStateName);
  context.jhiTablePrefix = this.getTableName(context.jhiPrefix);

  context.fieldsContainInstant = false;
  context.fieldsContainZonedDateTime = false;
  context.fieldsContainLocalDate = false;
  context.fieldsContainBigDecimal = false;
  context.fieldsContainBlob = false;
  context.fieldsContainImageBlob = false;
  context.validation = false;
  context.fieldsContainOwnerManyToMany = false;
  context.fieldsContainNoOwnerOneToOne = false;
  context.fieldsContainOwnerOneToOne = false;
  context.fieldsContainOneToMany = false;
  context.fieldsContainManyToOne = false;
  context.differentTypes = [context.entityClass];
  if (!context.relationships) {
    context.relationships = [];
  }
  context.differentRelationships = {};

  // Load in-memory data for fields
  context.fields.forEach((field) => {
    // Migration from JodaTime to Java Time
    if (field.fieldType === 'DateTime' || field.fieldType === 'Date') {
      field.fieldType = 'Instant';
    }
    const fieldType = field.fieldType;

    const nonEnumType = _.includes(['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal',
      'LocalDate', 'Instant', 'ZonedDateTime', 'Boolean', 'byte[]', 'ByteBuffer'], fieldType);
    if ((['sql', 'mongodb', 'couchbase'].includes(context.databaseType)) && !nonEnumType) {
      field.fieldIsEnum = true;
    } else {
      field.fieldIsEnum = false;
    }

    if (_.isUndefined(field.fieldNameCapitalized)) {
      field.fieldNameCapitalized = _.upperFirst(field.fieldName);
    }

    if (_.isUndefined(field.fieldNameUnderscored)) {
      field.fieldNameUnderscored = _.snakeCase(field.fieldName);
    }

    if (_.isUndefined(field.fieldNameAsDatabaseColumn)) {
      const fieldNameUnderscored = _.snakeCase(field.fieldName);
      const jhiFieldNamePrefix = this.getColumnName(context.jhiPrefix);
      if (jhiCore.isReservedTableName(fieldNameUnderscored, context.databaseType)) {
        field.fieldNameAsDatabaseColumn = `${jhiFieldNamePrefix}_${fieldNameUnderscored}`;
      } else {
        field.fieldNameAsDatabaseColumn = fieldNameUnderscored;
      }
    }

    if (_.isUndefined(field.fieldNameHumanized)) {
      field.fieldNameHumanized = _.startCase(field.fieldName);
    }

    if (_.isUndefined(field.fieldInJavaBeanMethod)) {
      // Handle the specific case when the second letter is capitalized
      // See http://stackoverflow.com/questions/2948083/naming-convention-for-getters-setters-in-java
      if (field.fieldName.length > 1) {
        const firstLetter = field.fieldName.charAt(0);
        const secondLetter = field.fieldName.charAt(1);
        if (firstLetter === firstLetter.toLowerCase() && secondLetter === secondLetter.toUpperCase()) {
          field.fieldInJavaBeanMethod = firstLetter.toLowerCase() + field.fieldName.slice(1);
        } else {
          field.fieldInJavaBeanMethod = _.upperFirst(field.fieldName);
        }
      } else {
        field.fieldInJavaBeanMethod = _.upperFirst(field.fieldName);
      }
    }

    if (_.isUndefined(field.fieldValidateRulesPatternJava)) {
      field.fieldValidateRulesPatternJava = field.fieldValidateRulesPattern
        ? field.fieldValidateRulesPattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"') : field.fieldValidateRulesPattern;
    }

    if (_.isArray(field.fieldValidateRules) && field.fieldValidateRules.length >= 1) {
      field.fieldValidate = true;
    } else {
      field.fieldValidate = false;
    }

    if (fieldType === 'ZonedDateTime') {
      context.fieldsContainZonedDateTime = true;
    } else if (fieldType === 'Instant') {
      context.fieldsContainInstant = true;
    } else if (fieldType === 'LocalDate') {
      context.fieldsContainLocalDate = true;
    } else if (fieldType === 'BigDecimal') {
      context.fieldsContainBigDecimal = true;
    } else if (fieldType === 'byte[]' || fieldType === 'ByteBuffer') {
      context.fieldsContainBlob = true;
      if (field.fieldTypeBlobContent === 'image') {
        context.fieldsContainImageBlob = true;
      }
    }

    if (field.fieldValidate) {
      context.validation = true;
    }
  });
  // Load in-memory data for relationships
  context.relationships.forEach((relationship) => {
    if (_.isUndefined(relationship.relationshipNameCapitalized)) {
      relationship.relationshipNameCapitalized = _.upperFirst(relationship.relationshipName);
    }

    if (_.isUndefined(relationship.relationshipNameCapitalizedPlural)) {
      if (relationship.relationshipName.length > 1) {
        relationship.relationshipNameCapitalizedPlural = pluralize(_.upperFirst(relationship.relationshipName));
      } else {
        relationship.relationshipNameCapitalizedPlural = _.upperFirst(pluralize(relationship.relationshipName));
      }
    }

    if (_.isUndefined(relationship.relationshipNameHumanized)) {
      relationship.relationshipNameHumanized = _.startCase(relationship.relationshipName);
    }

    if (_.isUndefined(relationship.relationshipNamePlural)) {
      relationship.relationshipNamePlural = pluralize(relationship.relationshipName);
    }

    if (_.isUndefined(relationship.relationshipFieldName)) {
      relationship.relationshipFieldName = _.lowerFirst(relationship.relationshipName);
    }

    if (_.isUndefined(relationship.relationshipFieldNamePlural)) {
      relationship.relationshipFieldNamePlural = pluralize(_.lowerFirst(relationship.relationshipName));
    }

    if (_.isUndefined(relationship.otherEntityRelationshipNamePlural) && (relationship.relationshipType === 'one-to-many'
      || (relationship.relationshipType === 'many-to-many' && relationship.ownerSide === false)
      || (relationship.relationshipType === 'one-to-one' && relationship.otherEntityName.toLowerCase() !== 'user'))) {
      relationship.otherEntityRelationshipNamePlural = pluralize(relationship.otherEntityRelationshipName);
    }

    if (_.isUndefined(relationship.otherEntityRelationshipNameCapitalized)) {
      relationship.otherEntityRelationshipNameCapitalized = _.upperFirst(relationship.otherEntityRelationshipName);
    }

    if (_.isUndefined(relationship.otherEntityRelationshipNameCapitalizedPlural)) {
      relationship.otherEntityRelationshipNameCapitalizedPlural = pluralize(_.upperFirst(relationship.otherEntityRelationshipName));
    }

    const otherEntityName = relationship.otherEntityName;
    const otherEntityData = this.getEntityJson(otherEntityName);
    const jhiTablePrefix = context.jhiTablePrefix;

    if (context.dto && context.dto === 'mapstruct') {
      if (otherEntityData && (!otherEntityData.dto || otherEntityData.dto !== 'mapstruct')) {
        this.warning(chalk.red(`This entity has the DTO option, and it has a relationship with entity "${otherEntityName}" that doesn't have the DTO option. This will result in an error.`));
      }
    }

    if (otherEntityName === 'user') {
      relationship.otherEntityTableName = `${jhiTablePrefix}_user`;
    } else {
      relationship.otherEntityTableName = otherEntityData ? otherEntityData.entityTableName : null;
      if (!relationship.otherEntityTableName) {
        relationship.otherEntityTableName = this.getTableName(otherEntityName);
      }
      if (jhiCore.isReservedTableName(relationship.otherEntityTableName, context.prodDatabaseType)) {
        const otherEntityTableName = relationship.otherEntityTableName;
        relationship.otherEntityTableName = `${jhiTablePrefix}_${otherEntityTableName}`;
      }
    }

    if (_.isUndefined(relationship.otherEntityNamePlural)) {
      relationship.otherEntityNamePlural = pluralize(relationship.otherEntityName);
    }

    if (_.isUndefined(relationship.otherEntityNameCapitalized)) {
      relationship.otherEntityNameCapitalized = _.upperFirst(relationship.otherEntityName);
    }

    if (_.isUndefined(relationship.otherentityClass)) {
      if (relationship.otherEntityNameCapitalized !== 'User') {
        const otherEntityAngularSuffix = otherEntityData ? otherEntityData.angularJSSuffix || '' : '';
        relationship.otherentityClass = _.upperFirst(relationship.otherEntityName) + _.upperFirst(_.camelCase(otherEntityAngularSuffix));
      } else {
        relationship.otherentityClass = 'User';
      }
    }

    if (_.isUndefined(relationship.otherEntityNameCapitalizedPlural)) {
      relationship.otherEntityNameCapitalizedPlural = pluralize(_.upperFirst(relationship.otherEntityName));
    }

    if (_.isUndefined(relationship.otherEntityFieldCapitalized)) {
      relationship.otherEntityFieldCapitalized = _.upperFirst(relationship.otherEntityField);
    }

    if (_.isUndefined(relationship.otherEntityStateName)) {
      relationship.otherEntityStateName = _.kebabCase(relationship.otherentityClass);
    }
    if (_.isUndefined(relationship.otherEntityModuleName)) {
      if (relationship.otherEntityNameCapitalized !== 'User') {
        relationship.otherEntityModuleName = `${context.angularXAppName + relationship.otherEntityNameCapitalized}Module`;
        relationship.otherEntityModulePath = _.kebabCase(_.lowerFirst(relationship.otherEntityName));
      } else {
        relationship.otherEntityModuleName = `${context.angularXAppName}SharedModule`;
        relationship.otherEntityModulePath = '../shared';
      }
    }
    // Load in-memory data for root
    if (relationship.relationshipType === 'many-to-many' && relationship.ownerSide) {
      context.fieldsContainOwnerManyToMany = true;
    } else if (relationship.relationshipType === 'one-to-one' && !relationship.ownerSide) {
      context.fieldsContainNoOwnerOneToOne = true;
    } else if (relationship.relationshipType === 'one-to-one' && relationship.ownerSide) {
      context.fieldsContainOwnerOneToOne = true;
    } else if (relationship.relationshipType === 'one-to-many') {
      context.fieldsContainOneToMany = true;
    } else if (relationship.relationshipType === 'many-to-one') {
      context.fieldsContainManyToOne = true;
    }

    if (relationship.relationshipValidateRules && relationship.relationshipValidateRules.indexOf('required') !== -1) {
      relationship.relationshipValidate = relationship.relationshipRequired = context.validation = true;
    }

    const entityType = relationship.otherEntityNameCapitalized;
    if (context.differentTypes.indexOf(entityType) === -1) {
      context.differentTypes.push(entityType);
    }
    if (!context.differentRelationships[entityType]) {
      context.differentRelationships[entityType] = [];
    }
    context.differentRelationships[entityType].push(relationship);
  });

  context.pkType = this.getPkType(context.databaseType);
}

/*
{
  openapi: '3.0.2',
  info: {
    title: 'Swagger Petstore - OpenAPI 3.0',
    description: 'This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\n' +
      "Swagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!\n" +
      "You can now help us improve the API whether it's by making changes to the definition itself or to the code.\n" +
      'That way, with time, we can improve the API in general, and expose some of the new features in OAS3.\n' +
      '\n' +
      'Some useful links:\n' +
      '- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)\n' +
      '- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)',
    termsOfService: 'http://swagger.io/terms/',
    contact: { email: 'apiteam@swagger.io' },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
    version: '1.0.6'
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io'
  },
  servers: [ { url: '/api/v3' } ],
  tags: [
    {
      name: 'pet',
      description: 'Everything about your Pets',
      externalDocs: [Object]
    },
    { name: 'store', description: 'Operations about user' },
    {
      name: 'user',
      description: 'Access to Petstore orders',
      externalDocs: [Object]
    }
  ],
  paths: {
    '/pet': { put: [Object], post: [Object] },
    '/pet/findByStatus': { get: [Object] },
    '/pet/findByTags': { get: [Object] },
    '/pet/{petId}': { get: [Object], post: [Object], delete: [Object] },
    '/pet/{petId}/uploadImage': { post: [Object] },
    '/store/inventory': { get: [Object] },
    '/store/order': { post: [Object] },
    '/store/order/{orderId}': { get: [Object], delete: [Object] },
    '/user': { post: [Object] },
    '/user/createWithList': { post: [Object] },
    '/user/login': { get: [Object] },
    '/user/logout': { get: [Object] },
    '/user/{username}': { get: [Object], put: [Object], delete: [Object] }
  },
  components: {
    schemas: {
      Order: [Object],
      Customer: [Object],
      Address: [Object],
      Category: [Object],
      User: [Object],
      Tag: [Object],
      Pet: [Object],
      ApiResponse: [Object]
    },
    requestBodies: { Pet: [Object], UserArray: [Object] },
    securitySchemes: { petstore_auth: [Object], api_key: [Object] }
  }
}

*/
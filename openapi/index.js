const GenBase = require('../core/base');
const writeFiles = require('./files').writeFiles;
//const getOpenApi = require('../core/utils').getOpenApi;
const SwaggerParser = require("@apidevtools/swagger-parser");


module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
    }

    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'path_api',
                message: 'Url/path to your api doc (json/yaml)',
                validate: input => (/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input) ? true : 'Url or Path not provide.'),
                store: true
            },
            {
                type: 'input',
                name: 'packageName',
                validate: input => (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input) ? true : 'The package name you have provided is not a valid Java package name.'),
                message: 'What is your package name?',
                store: true
            },
            {
                type: 'list',
                name: 'android',
                message: 'Which Android native code do you want to use?',
                choices: [
                    {
                        value: 'kotlin',
                        name: 'Kotlin'
                    },
                    {
                        value: 'java',
                        name: 'Java'
                    },
                ],
                default: 'kotlin'
            },
            {
                type: 'list',
                name: 'ios',
                message: 'Which iOS native code do you want to use?',
                choices: [
                    {
                        value: 'swift',
                        name: 'Swift'
                    },
                    {
                        value: 'objc',
                        name: 'Objective-C'
                    },
                ],
                default: 'swift'
            },
            {
                type: 'list',
                name: 'stateManageType',
                message: 'Which State-Management style do you want to use?',
                choices: [
                    {
                        value: 'mobx',
                        name: 'MobX state-management'
                    },
                    {
                        value: 'bloc',
                        name: 'BLoC state-management'
                    },
                ],
                default: 'mobx'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {

            //  const params = props.path_api
            this.config.set('params', props)

            /* SwaggerParser.validate(params, (err, api) => {
                if (err) {
                    console.error(err);
                }
                else {
                    this.props = { 
                        appsName: this.appsName, 
                        baseName: props.appsName,
                        packageName: props.packageName,
                        packageFolder: this.appsName, 
                        stateManageType: props.stateManageType,
                        android: props.android,
                        ios: props.ios,
                        entities: mappingEntities(api.components.schemas) }
                    done();
                }
            }) */

            done();
        });
    }
    gatherapi() {
        const done = this.async();
        const props = this.config.get('params')

        SwaggerParser.validate(props.path_api, (err, api) => {
            if (err) {
                console.error(err);
            }
            else {
                this.props = {
                    appsName: this.appsName,
                    baseName: this.appsName,
                    packageName: props.packageName,
                    packageFolder: this.appsName,
                    stateManageType: props.stateManageType,
                    android: props.android,
                    ios: props.ios,
                    // context.differentRelationships[
                    // pkType = this.getPkType(context.databaseType);
                    entities: mappingEntities(this.appsName,api.components.schemas)
                }
                done();
            }
        })
    }
    validate() {
        //this.composeWith(require.resolve('generator-jhipster-kutilang/generators/mobx'),this.props);

        // this.composeWith(require.resolve('generator-jhipster-kutilang/generators/entity-mobx'),this.props);

    }


    writingEntity() {
        console.log('----writing entity openapi---')
        // const writeEntity = require('generator-jhipster-kutilang/generators/entity-mobx/files');
        //console.log(this.props)

        // this.composeWith(require.resolve('generator-jhipster-kutilang/generators/entity-mobx'),this.props,{name:'myname'},);
        //this.template('coba.txt', 'coba-baru.txt',this, {});
        // console.log(this.props)
        // return writeEntity;
        this.props.entities.forEach(entity => {
         writeFiles(this.props.packageFolder, entity, this)
        })
    }

    /*  get writing() {
         console.log(this.props)
         return writeFiles(this.props);
     } */

}

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
    // relationship.relationshipValidate 
    /*  context.fieldsContainOwnerManyToMany = true;
     context.fieldsContainNoOwnerOneToOne = true;
     context.fieldsContainOwnerOneToOne = true;
     context.fieldsContainOneToMany = true;
     context.fieldsContainManyToOne = true;
     relationship.otherEntityModulePath 
     relationship.otherEntityModuleName
     relationship.otherEntityStateName =
     relationship.otherEntityFieldCapitalized
     relationship.otherentityClass = 'User';
     relationship.otherEntityTableName 
     relationship.otherEntityNameCapitalized
     relationship.otherEntityNamePlural
     relationship.otherEntityName */
    /* 
       const entityConfig = {
        jhipsterConfigDirectory: this.jhipsterConfigDirectory,
        filename: this.filename,
        data: this.data || this.fileData,
        useConfigurationFile: this.useConfigurationFile,
        fieldsContainOwnerManyToMany: this.fieldsContainOwnerManyToMany,
        fieldsContainNoOwnerOneToOne: this.fieldsContainNoOwnerOneToOne,
        fieldsContainOwnerOneToOne: this.fieldsContainOwnerOneToOne,
        fieldsContainOneToMany: this.fieldsContainOneToMany,
        fieldsContainInstant: this.fieldsContainInstant,
        fieldsContainZonedDateTime: this.fieldsContainZonedDateTime,
        fieldsContainLocalDate: this.fieldsContainLocalDate,
        fieldsContainBigDecimal: this.fieldsContainBigDecimal,
        fieldsContainBlob: this.fieldsContainBlob,
        fieldsContainImageBlob: this.fieldsContainImageBlob,
        jpaMetamodelFiltering: this.jpaMetamodelFiltering,
        pkType: this.pkType,
        entityApiUrl: this.entityApiUrl,
        entityClass: this.entityClass,
        entityTableName: this.entityTableName,
        entityInstance: this.entityInstance,
        entityFolderName: this.entityFolderName,
        entityFileName: this.entityFileName,
        entityServiceFileName: this.entityServiceFileName,
        entityStateName: this.entityStateName,
        entityUrl: this.entityUrl,
        entityTranslationKey: this.entityTranslationKey 
    };*/
    return relationship
}


/*

curl -X 'GET' \
  'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available' \
  -H 'accept: application/xml'

  <ArrayList>

  <item>
    <id>9688</id>
    <category>
      <id>1</id>
      <name>dog</name>
    </category>
    <name>Doggie</name>
    <photoUrls>
      <photoUrl>http://pet.photo.com/super_pet</photoUrl>
    </photoUrls>
    <tags>
      <tag>
        <id>-8697</id>
        <name>defaultTag</name>
      </tag>
    </tags>
    <status>available</status>
  </item>

  <item>
    <id>-6314</id>
    <category>
      <id>1</id>
      <name>Dogs</name>
    </category>
    <name>Chickens Flora Cain</name>
    <photoUrls>
      <photoUrl>string</photoUrl>
    </photoUrls>
    <tags>
      <tag>
        <id>250</id>
        <name>defaultTag</name>
      </tag>
    </tags>
    <status>available</status>
  </item>
  </ArrayList>


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
{
  post: {
    tags: [ 'pet' ],
    summary: 'uploads an image',
    description: '',
    operationId: 'uploadFile',
    parameters: [
        {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to update',
            required: true,
            schema: { type: 'integer', format: 'int64' }
        },
        {
            name: 'additionalMetadata',
            in: 'query',
            description: 'Additional Metadata',
            required: false,
            schema: { type: 'string' }
        }
    ],
    requestBody: { content: [Object] },
    responses: { '200': [Object] },
    security: [ [Object] ]
  }
}

*/


/*

{
  sharedData: {},
  forwardErrorToEnvironment: false,
  skipLocalCache: true,
  appsName: 'kut01',
  api_source: 'openapi',
  skipInstall: undefined,
  skipCache: undefined,
  forceInstall: undefined,
  destinationRoot: '~/Kays-Projects/Kujang/kujang-sample/kut01',
  env: <ref *1> Environment {
    _events: [Object: null prototype] {
      end: [Array],
      error: [Function (anonymous)],
      'generator:reject': [Function (anonymous)],
      'generator:resolve': [Function (anonymous)]
    },
    _eventsCount: 4,
    _maxListeners: 100,
    options: {},
    adapter: TerminalAdapter {
      promptModule: [Function],
      console: [Console [console]],
      log: [Function],
      tracker: [EventEmitter]
    },
    cwd: '~/Kays-Projects/Kujang/kujang-sample/kut01',
    logCwd: '~/Kays-Projects/Kujang/kujang-sample/kut01',
    store: Store {
      _generators: [Object],
      _meta: [Object],
      _packagesPaths: [Object],
      _packagesNS: [Array]
    },
    command: undefined,
    runLoop: Queue {
      queueNames: [Array],
      __queues__: [Object],
      runOnAdd: false,
      _maxListeners: 0,
      _events: [Object: null prototype],
      _eventsCount: 3,
      running: true
    },
    sharedFs: Store {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: 0,
      store: [Object],
      [Symbol(kCapture)]: false
    },
    fs: EditionInterface { store: [Store] },
    lookups: [ '.', 'generators', 'lib/generators', 'dist/generators' ],
    aliases: [ [Object] ],
    sharedOptions: {
      sharedData: {},
      forwardErrorToEnvironment: false,
      skipLocalCache: true
    },
    repository: YeomanRepository {
      log: [Function],
      tracker: [EventEmitter],
      _repositoryPath: '~/Kays-Projects/Kujang/kujang-sample/kut01/.yo-repository',
      _nodeModulesPath: '~/Kays-Projects/Kujang/kujang-sample/kut01/.yo-repository/node_modules'
    },
    _generatorsForPath: {
      '~/Kays-Projects/Kujang/kujang-sample/kut01': [Object]
    },
    _generators: {},
    _composeStore: {},
    compatibilityMode: false,
    _rootGenerator: Generator {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      options: [Object],
      _initOptions: [Object],
      _args: [],
      _options: [Object],
      _arguments: [],
      _prompts: [],
      _composedWith: [],
      _namespace: 'kujang:app',
      _namespaceId: undefined,
      yoGeneratorVersion: '5.4.1',
      features: [Object],
      args: [],
      arguments: [],
      env: [Circular *1],
      resolved: '~/Kays-Projects/Kujang/generator-kujang/app/index.js',
      description: '',
      contextRoot: '~/Kays-Projects/Kujang/kujang-sample/kut01',
      _destinationRoot: '~/Kays-Projects/Kujang/kujang-sample/kut01',
      _config: [Storage],
      _packageJson: undefined,
      _sourceRoot: '~/Kays-Projects/Kujang/generator-kujang/app/templates',
      fs: [EditionInterface],
      _debug: [Function],
      _: [Function],
      log: [Function],
      async: [Function (anonymous)],
      appname: 'kut01',
      _globalConfig: [Storage],
      _queues: [Object],
      compose: undefined,
      _environmentOptions: [Object],
      _running: true,
      _taskStatus: [Object],
      props: [Object],
      runningState: [Object],
      [Symbol(kCapture)]: false
    },
    conflicter: Conflicter {
      adapter: [TerminalAdapter],
      force: undefined,
      bail: undefined,
      ignoreWhitespace: undefined,
      regenerate: undefined,
      dryRun: undefined,
      cwd: '~/Kays-Projects/Kujang/kujang-sample/kut01',
      diffOptions: undefined,
      queue: [Queue]
    },
    [Symbol(kCapture)]: false
  },
  resolved: '~/Kays-Projects/Kujang/generator-kujang/openapi/index.js',
  namespace: 'kujang:openapi',
  _: [],
  'skip-cache': false,
  'skip-install': false,
  'force-install': false,
  'ask-answered': false
}

*/
const GenBase = require('../core/base');
const writeFiles = require('./files').writeFiles;

module.exports = class extends GenBase {
    
    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        const prompts = [
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
            this.props = props;
            done();
        });
    }

    get writing() {
        return writeFiles();
    }
}


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
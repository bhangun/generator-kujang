const GenBase = require('kujang-core/core/base');
const packagejs = require('../package.json');

module.exports = class extends GenBase {
    constructor(args, opts) {
        super(args, opts);
        
    }
    get init() {
         return this.initializing(packagejs)
    }

    prompting() {
       
        const appsName = this.getDefaultAppName(); 

        const prompts = [
            {
                type: 'input',
                name: 'appsName',
                message: `What would your ${this.chalkBlueBright('Flutter')} application name?`,
                validate: input => (/^[^\s][A-z0-9-_]*$/.test(input) ? true : 'Please avoid space or non standard flutter apps name!'),
                default: appsName,
                //store: true
            },
            {
                type: 'list',
                name: 'api_source',
                message: 'From which Api definition you want to generate?',
                store: true,
                choices: [
                    {
                        value: 'openapi',
                        name: 'OpenApi/Swagger API Standard'
                    },                    
                ],
                default: 'openapi'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            this.appsName = props.appsName
            done();
        });
    }

    writing() {
        this.composeWith(require.resolve('../openapi'), this.props );
    }
};
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
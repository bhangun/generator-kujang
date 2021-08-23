const writeFiles = require('./files').writeFiles;
const GenBase = require('../core/base');

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    prompting() {
        const prompts = [
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

            this.config.set('params', props)
            this.config.set('baseName', props.baseName);
            this.config.set('appsName', this.appsName);
            this.config.set('packageName', props.packageName);
            this.config.set('packageFolder', props.appsName);
            this.config.set('android', props.android);
            this.config.set('ios', props.ios);
            done();
        });
    }

    get writing() {

        this.composeWith(require.resolve('../entity-mobx'), this.props);

        return writeFiles(this.props);
    }

    install() {
        this.spawnCommand('flutter', ['create', '--org', `${this.packageName}`, '--project-name', `${this.appsName}`, '-a', `${this.config.get('android')}`, '-i', `${this.config.get('ios')}`, `${this.appsName}`]);
    }

    end() {
        this.log('Congratulation! Your Flutter Apps has been generated!');
    }
};


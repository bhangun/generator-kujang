const GenBase = require('../core/base');
const chalk = require('chalk');
const packagejs = require('../package.json');
const shelljs = require('shelljs');

module.exports = class extends GenBase {

    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            displayLogo() {
                this.log(`${chalk.bold.yellowBright('                ▄      ')}`);
                this.log(`${chalk.bold.yellowBright('            ▄▄▄██ ')}`);
                this.log(`${chalk.bold.yellowBright('       ▄▄███████ ')}`);
                this.log(`${chalk.bold.yellowBright('    ▄██░░██████ ')}`);
                this.log(`${chalk.bold.yellowBright('   ██░░███████  ')}${chalk.bold.cyan('__              __')}`);
                this.log(`${chalk.bold.yellowBright('  █░░████████  ')}${chalk.bold.cyan('|  | ____ ___   |__|____    ____    ____ ')}`);
                this.log(`${chalk.bold.yellowBright(' ██████████    ')}${chalk.bold.cyan('|  |/ /  |   \\  |  \\__  \\  /    \\  / ___\\')}`);
                this.log(`${chalk.bold.yellowBright(' ███████       ')}${chalk.bold.cyan('|    <|  |   /  |  |/ __ \\|   |  \\/ /_/  >')}`);
                this.log(`${chalk.bold.yellowBright('  ██████       ')}${chalk.bold.cyan('|__|__ \\____/\\__|  (____  /___|  /\\___  /     ')}`);
                this.log(`${chalk.bold.yellowBright('   ██████     ██     ')}${chalk.bold.cyan('\\/    \\______|    \\/     \\//_____/')}`);
                this.log(`${chalk.bold.yellowBright('    ████████████ ')}`);
                this.log(`${chalk.bold.yellowBright('      █████████ ')}`);
                this.log(`${chalk.bold.redBright('        ████▌  ')}`);
                this.log(`${chalk.bold.redBright('        ████')}   Salam to the ${chalk.bold.yellow('Kujang')} generator! ${chalk.yellow(`${packagejs.version}`)}`);
                this.log(`${chalk.bold.redBright('        █████')}`);
                this.log(`${chalk.bold.red('         ▀▀▀▀')}`);
            },
        };
    }

    
    prompting() {
       
        const appsName = this.getDefaultAppName(); 

        const prompts = [
            {
                type: 'input',
                name: 'appsName',
                message: 'What is your Flutter application name?',
                default: appsName,
                // store: true
            },
           /*  {
                type: 'input',
                name: 'directoryPath',
                message: 'Where JHipster app directory is located?',
                default: 'backend',
                store: true,
                validate: (input) => {
                    const path = this.destinationPath(input);
                    if (shelljs.test('-d', path)) {
                        const appsFolders = getAppFolder.call(this, input);
                        if (appsFolders.length === 0) {
                            return `No application found in ${path}`;
                        }
                        return true;
                    }
                    return `${path} is not a directory or doesn't exist`;
                }
            },
            {
                type: 'input',
                name: 'packageName',
                validate: input => (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input) ? true : 'The package name you have provided is not a valid Java package name.'),
                message: 'What is your package name?',
                // default: this.jhipsterAppConfig.packageName,
                store: true
            },
            {
                type: 'list',
                name: 'android',
                message: 'Which Android native code do you want to use?',
                choices: [
                    {
                        value: 'java',
                        name: 'Java'
                    },
                    {
                        value: 'kotlin',
                        name: 'Kotlin'
                    },
                ],
                default: 'java'
            },
            {
                type: 'list',
                name: 'ios',
                message: 'Which iOS native code do you want to use?',
                choices: [
                    {
                        value: 'objc',
                        name: 'Objective-C'
                    },
                    {
                        value: 'swift',
                        name: 'Swift'
                    },
                ],
                default: 'objc'
            }, */
            /* {
                // when: response => applicationType === 'gateway' || applicationType === 'microservice' || applicationType === 'uaa',
                type: 'list',
                name: 'stateManageType',
                message: 'Which State-Management style do you want to use?',
                choices: [
                   
                    {
                        value: 'mobx',
                        name: 'MobX state-management'
                    },
                    
                ],
                default: 'basic'
            }, */
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            done();
        });
    }

    get writing() {

        /* if (this.props.stateManageType === 'provider') {
            this.composeWith(require.resolve('../provider'));
        } else if (this.props.stateManageType === 'mobx') {
            this.composeWith(require.resolve('../mobx'));
        } else {
            this.composeWith(require.resolve('../basic'));
        } */

        this.composeWith(require.resolve('../default'));



       // return writeFiles();
    }
};
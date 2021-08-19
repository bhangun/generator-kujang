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
                message: 'What would your Flutter application name?',
                default: appsName,
                store: true
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
                    {
                        value: 'jhipster',
                        name: 'JHipster generator'
                    },
                    
                ],
                default: 'openapi'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            done();
        });
    }

    writing() {

        if (this.props.api_source === 'jhipster') {
            this.composeWith(require.resolve('../jhipster'),  this.props );
        } else {
            this.composeWith(require.resolve('../openapi'), this.props );
        }
    }
};
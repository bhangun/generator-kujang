const GenBase = require('../core/base');
const chalk = require('chalk');
const packagejs = require('../package.json');

const writeFiles = require('./files').writeFiles;

const name = 'bismillah'

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
                this.log(`${chalk.bold.yellowBright('  ██████       ')}${chalk.bold.cyan('|__|_  \\____/\\__|  (____  /___|  /\\___  /     ')}`);
                this.log(`${chalk.bold.yellowBright('   ██████     ██     ')}${chalk.bold.cyan('\\/    \\______|    \\/     \\//_____/')}`);
                this.log(`${chalk.bold.yellowBright('    ████████████ ')}`);
                this.log(`${chalk.bold.yellowBright('      █████████ ')}`);
                this.log(`${chalk.bold.yellowBright('        ████▌  ')}`);
                this.log(`${chalk.bold.yellowBright('        ████')}`);
                this.log(`${chalk.bold.yellowBright('        █████')}`);
                this.log(`${chalk.bold.yellowBright('         ▀▀▀▀')}`);


                // Have Yeoman greet the user.
                this.log(`\nSalam to the ${chalk.bold.yellow('Kujang')} generator! ${chalk.yellow('v${packagejs.version}\n')}`);
            },
        };
    }

    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }

    get writing() {
        return writeFiles();
    }
};
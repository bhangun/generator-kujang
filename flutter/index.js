/**
 * Copyright 2013-2021 the original author or authors Bhangun Hartani
 * This file is part of the Kujang Generator
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const GenBase = require('kujang-core/core');

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
                message: `What is your ${this.chalkBlueBright('Flutter')} package name?`,
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
                name: 'stateManagementType',
                message: 'Which State-Management style do you want to use?',
                choices: [
                    {
                        value: 'mobx',
                        name: 'MobX state-management'
                    },
                    {
                        value: 'riverpod',
                        name: 'Riverpod state-management'
                    },
                    /* {
                        value: 'bloc',
                        name: 'Flutter_Bloc state-management'
                    }, */
                ],
                default: 'mobx'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.config.set('params', props.param)
            this.config.set('baseName', props.baseName);
            this.config.set('appsName', this.appsName);
            this.config.set('stateManagementType', props.stateManagementType);
            this.config.set('packageName', props.packageName);
            this.config.set('packageFolder', props.appsName);
            this.config.set('android', props.android);
            this.config.set('ios', props.ios);
            done();
        });
    }

    writing() {

        this.props.isPrintComponent = false

        this.props.methods = this.propsForService(this.props.paths, this.props.properties, 'dart' )
        this.props._ = this._

        this.props.findEqualObject = this.findEqualObject

        this.composeWith(require.resolve('./entity'), this.props);
      
        this.composeWith(require.resolve('./core'), this.props);
    }


    install() {
        this.spawnCommand('flutter', ['create', '--org', `${this.packageName}`, '--project-name', `${this.appsName}`, '-a', `${this.config.get('android')}`, '-i', `${this.config.get('ios')}`, `${this.appsName}`]);
    }

    end() {
        this.log('Congratulation! Your Flutter Apps has been generated!');
    }
};


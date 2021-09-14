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
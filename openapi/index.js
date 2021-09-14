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

/**
 * 
 */
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
                message: `Url/path to your api doc ${this.chalkYellowBright('(json/yaml/yml)')}`,
                validate: input => (/^((https?|chrome|file):\/\/[^\s$.?#].[^\s]*)|([A-z0-9-_+/:]+.(json|yaml|yml))$/.test(input) ? true : 'Something wrong with your URL or Path, please change!'),
                store: true
            },
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.transformApi(this.appsName, props.path_api, (api, origin)=>{
                this.props = api
                this.writeKujangJson(this.appsName,this.props)
                this.writeOriginJson(this.appsName,origin)
                done();
            })
        });
    }
   
    compose() {
       this.composeWith(require.resolve('../flutter-mobx/mobx'), this.props);
    }

   
    /* test(){
        this.composeWith(require.resolve('../entity-mobx'), this.props);
    } */

    /* test(){
        const opt = {paths:this.props.paths}
        opt.appsName = 'coba'
        this.template('apps.services.ejs', `serpis.dart`,this,this.props);
    } */

}
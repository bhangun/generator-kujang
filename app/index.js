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
const packagejs = require('../package.json');

module.exports = class extends GenBase {
    constructor(args, opts) {
        super(args, opts);
        this.props = opts
    }

    get init() {
         return this.initializing(this, this.props, packagejs)
    }

    compose() {
        if(!this.props.modules) 
           this.composeWith(require.resolve('../flutter-mobx/mobx'), this.props);
     }

   
};
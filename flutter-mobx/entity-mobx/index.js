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
const writeEntity = require('./files').writeFiles;
const writeOperation = require('./operation').writeFiles;

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    writingEntity() {

        if (this.props.entities.length>0) this.props.entities.forEach(e => {
            this.props.entity = e   
            writeEntity(this.props.packageFolder, this, this.props,  this._)
        })
        else this.otherEntity(this.props.paths).forEach(el =>{
            this.props.entity = el
            writeEntity(this.props.packageFolder, this, this.props,  this._)
        })
        this.props._ = this._
        this.props.paths.forEach((path,i) =>{
            writeOperation(this.props.packageFolder, path, this, i, this.props)
        })
    }
}

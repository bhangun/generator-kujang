
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

module.exports = {
    writeFiles
};

function writeFiles(folder, path, obj, i, props) {
    props.path = path
    props.index = i
    const pathFolder = folder + '/lib/pages/path' + i
    const storeFolder = folder + '/lib/bloc/path' + i
    path.methods.forEach(method => {
        props.method = method
        obj.template('bloc.operation.form.ejs',`${pathFolder}/${method.operationId}.dart`, obj, props)

        obj.template('bloc.operation.bloc.ejs', `${storeFolder}/${method.operationId}_bloc.dart`, obj, props)
    })
}
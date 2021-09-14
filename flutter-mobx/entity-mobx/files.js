
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


function writeFiles(folder, obj, props, _) {

    const entityFolderName = folder + '/lib/modules/' + props.entityClass

    const entityFileName = props.entityClass
    props.entity._ = _ 
//console.log(props.entity)
    obj.template('entity.ejs', `${folder}/lib/models/${entityFileName}.dart`, obj, props.entity)

    if (props.isPrintComponent) {
        obj.template('entity.list.ejs', `${entityFolderName}/screens/${entityFileName}_list.dart`, obj, props)
        obj.template('entity.detail.ejs', `${entityFolderName}/screens/${entityFileName}_detail.dart`, obj, props)
        obj.template('entity.form.ejs', `${entityFolderName}/screens/${entityFileName}_form.dart`, obj, props)
        obj.template('entity.services.ejs', `${entityFolderName}/services/${entityFileName}_services.dart`, obj, props)
        obj.template('entity.store.ejs', `${entityFolderName}/store/${entityFileName}_store.dart`, obj, props)
        obj.template('entity.route.ejs', `${entityFolderName}/services/${entityFileName}_routes.dart`, obj, props)
        obj.template('entity.module.ejs', `${entityFolderName}/${entityFileName}_module.dart`, obj, props)
    }
}
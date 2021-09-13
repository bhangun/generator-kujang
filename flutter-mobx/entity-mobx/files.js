
module.exports = {
    writeFiles
};


function writeFiles(folder, entities, obj, _) {
    //console.log(option)
    //const entityFolderName = folder + '/lib/modules/' + option.entityClass
    const entityFileName = entities.entityClass
    obj.template('entity.ejs', `${folder}/lib/models/${entityFileName}.dart`, obj, {entities: entities, _:_})

    /* obj.template('entity.list.ejs', `${entityFolderName}/screens/${entityFileName}_list.dart`, obj, option)
    obj.template('entity.detail.ejs', `${entityFolderName}/screens/${entityFileName}_detail.dart`, obj, option)
    obj.template('entity.form.ejs', `${entityFolderName}/screens/${entityFileName}_form.dart`, obj, option)
    obj.template('entity.services.ejs', `${entityFolderName}/services/${entityFileName}_services.dart`, obj, option)
    obj.template('entity.store.ejs', `${entityFolderName}/store/${entityFileName}_store.dart`, obj, option)
    obj.template('entity.route.ejs', `${entityFolderName}/services/${entityFileName}_routes.dart`, obj, option)
    obj.template('entity.module.ejs', `${entityFolderName}/${entityFileName}_module.dart`, obj, option) */
}
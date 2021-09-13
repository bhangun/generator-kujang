
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
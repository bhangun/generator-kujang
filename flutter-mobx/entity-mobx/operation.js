
module.exports = {
    writeFiles
};

function writeFiles(folder, path, obj, i, props) {
    props.path = path
    props.index = i
    const pathFolder = folder + '/lib/screens/path' + i
    const storeFolder = folder + '/lib/store/path' + i
    path.methods.forEach(method => {
        props.method = method
        obj.template('operation.form.ejs',`${pathFolder}/${method.operationId}.dart`, obj, props)

        obj.template('operation.store.ejs', `${storeFolder}/${method.operationId}_store.dart`, obj, props)
    })
}
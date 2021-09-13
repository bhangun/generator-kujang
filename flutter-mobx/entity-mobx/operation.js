
module.exports = {
    writeFiles
};

function writeFiles(folder, path, obj, i, _, appsName) {

    const pathFolder = folder + '/lib/screens/path' + i
    const storeFolder = folder + '/lib/store/path' + i
    path.methods.forEach(method => {
        obj.template('operation.form.ejs', 
            `${pathFolder}/${method.operationId}.dart`, 
            obj, 
            { _: _, index: i, method: method, path: path, appsName: appsName 
        })

        obj.template('operation.store.ejs', 
            `${storeFolder}/${method.operationId}_store.dart`, 
            obj, 
            { _: _, index: i, method: method, path: path, appsName: appsName 
        })
    })
}
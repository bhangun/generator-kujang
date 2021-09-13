
module.exports = {
    writeFiles
};

function writeFiles(folder, path, obj, i, _, appsName) {

    const pathFolderName = folder + '/lib/screens/path' + i
    path.methods.forEach(method => {
        obj.template('operation.form.ejs', `${pathFolderName}/screens/${method.operationId}_form.dart`, obj, { _: _, index: i, method: method, path: path, appsName: appsName })
    })
}
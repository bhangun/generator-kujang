module.exports = {
    writeFiles
};


function writeFiles() {
    return {
        
        writeGlobalFiles() {
            this.template('coba.txt', 'coba-baru.txt');
        },
    }
}
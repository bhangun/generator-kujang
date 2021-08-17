module.exports = {
    writeFiles
};


function writeFiles() {
    const option ={}
    option.name='bismillah'
    return {
        writeGlobalFiles() {
            this.template('coba.txt', 'coba-baru.txt', this, option, option);
        },
    }
}
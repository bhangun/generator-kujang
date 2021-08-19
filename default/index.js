const GenBase = require('../core/base');
const writeFiles = require('./files').writeFiles;

module.exports = class extends GenBase {

  /*   get initializing() {
        this.log('this si entity')
        return {
           
        }
    } */

    get writing() {
        return writeFiles();
    }
}
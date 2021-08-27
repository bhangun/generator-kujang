const GenBase = require('../core/base');
const utils = require('../core/utils');
const SwaggerParser = require("@apidevtools/swagger-parser");

/**
 * 
 */
module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
    }

    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'path_api',
                message: 'Url/path to your api doc (json/yaml)',
                validate: input => (/^((https?|chrome|file):\/\/[^\s$.?#].[^\s]*)|([A-z0-9-_+/:]+.(json|yaml|yml))$/.test(input) ? true : 'Url or Path not provide.'),
                store: true
            },
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {

            SwaggerParser.validate(props.path_api, (err, api) => {
                if (err) {
                    console.error(err);
                }
                else {
                    this.props = utils.mappingProps(api,this.appsName)
                    done();
                }
            })
        });
    }
   
    compose() {
       // this.composeWith(require.resolve('../mobx'), this.props);
    }
    test(){
        this.composeWith(require.resolve('../entity-mobx'), this.props);
    }

    /* test(){
        const opt = {paths:this.props.paths}
        opt.appsName = 'coba'
        this.template('apps.services.ejs', `serpis.dart`,this,this.props);
    } */
}
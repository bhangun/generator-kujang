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
                validate: input => (/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input) ? true : 'Url or Path not provide.'),
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
                    /* this.props = { 
                        appsName: this.appsName, 
                        baseName: props.appsName,
                        packageFolder: this.appsName, 
                        info: api.info,
                       
                        entities: utils.mappingEntities(this.appsName,api),
                        paths: utils.getPaths(api)
                    } */
                    this.props = utils.mappingProps(api,this.appname)
                    const opt = {paths:this.props.paths}
                    opt.appsName = 'coba'
                    console.log(this.props.paths[1].methods[0])
                    this.template('apps.services.ejs', `serpis.dart`,this,this.props);
                    done();
                }
            })
        });
    }
   
    compose() {

       // console.log(this.props.paths[0].methods[0].responses[0])
        //console.log(this.props.entities[6].fields)
        //this.composeWith(require.resolve('../mobx'), this.props);
    }
}
const GenBase = require('kujang-core/core/base');

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
                message: `Url/path to your api doc ${this.chalkYellowBright('(json/yaml/yml)')}`,
                validate: input => (/^((https?|chrome|file):\/\/[^\s$.?#].[^\s]*)|([A-z0-9-_+/:]+.(json|yaml|yml))$/.test(input) ? true : 'Something wrong with your URL or Path, please change!'),
                store: true
            },
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.transformApi(this.appsName, props.path_api, (api)=>{
                this.props = api
                this.writeKujangJson(this.appsName,this.props)
                done();
            })
        });
    }
   
    compose() {
        //this.composeWith(require.resolve('../flutter-mobx/mobx'), this.props);
    }

   

    /* test(){
        this.composeWith(require.resolve('../entity-mobx'), this.props);
    } */

    /* test(){
        const opt = {paths:this.props.paths}
        opt.appsName = 'coba'
        this.template('apps.services.ejs', `serpis.dart`,this,this.props);
    } */

}
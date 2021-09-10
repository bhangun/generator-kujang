const API2 = 'https://petstore.swagger.io/v2/swagger.json'
const API3 = 'https://petstore3.swagger.io/api/v3/openapi.json'
const API4 = 'test/pet-oas3.yaml'
const API5 = '../api_sample/oas_taufik.yaml'

const apitest = module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
    }

    test() {
        const done = this.async();
        this.prompt(prompts).then((props) => {
            utils.transformApi(this.appsName, API5, (api) => {
                this.props = api
                done();
            })
        });
    }

    compose() {
        this.composeWith(require.resolve('../flutter-mobx/mobx'), this.props);
    }
}

apitest.test()

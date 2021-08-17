const SwaggerParser = require("@apidevtools/swagger-parser");

module.exports = {
  getApi
};


function getApi(params) {
  SwaggerParser.validate(params, (err, api) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log("API name: %s, Version: %s", api.info.title, api.info.version);
      //console.log(api)
      console.log(api.paths['/pet/{petId}/uploadImage'].post.consumes)
    }
  });
}

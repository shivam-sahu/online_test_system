// const config = {
//   production:{
//     SECRET:process.env.SECRET,
//     DATABASE:process.env.MONGODB_URI
//   },
//   default:{
//     SECRET: "",
//     DATABASE:""
//   }
// }
// exports.get = function get(env){
//   return config[env] || config.default
// }
// module.exports = config.default;
// exports.get = function get(env) {
//   return  config.default
// }

const DATABASE = require("./credentials").DATABASE;
const SECRET = require("./credentials").SECRET;

module.exports = {
  DATABASE,
  SECRET
};


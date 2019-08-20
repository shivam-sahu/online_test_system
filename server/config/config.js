const config = {
  production:{
    SECRET:process.env.SECRET,
    DATABASE:process.env.MONGODB_URI
  },
  default:{
    SECRET: "Ss+%5c_GB/87A{sT",
    DATABASE:"mongodb://localhost:27017/testdb"
  }
}

exports.get = function get(env){
  return config[env] || config.default
}
// module.exports = config.default;
// exports.get = function get(env) {
//   return  config.default
// }

// module.exports = 